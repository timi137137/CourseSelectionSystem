import { CacheModule } from '@nestjs/cache-manager';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, ModuleRef } from '@nestjs/core';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_MODULE_OPTIONS } from '@nestjs/typeorm/dist/typeorm.constants';
import { redisStore } from 'cache-manager-redis-yet';
import { outputFile } from 'fs-extra';
import Redis from 'ioredis';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { join } from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { JwtAuthGuard } from './app/guard/auth/jwt.guard';
import { MasterModule } from './app/master.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, './config/.env'),
        join(__dirname, './config/jwt.env'),
      ],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: config.get<string>('REDIS_HOST'),
            port: config.get<number>('REDIS_PORT'),
          },
          ttl: config.get<number>('REDIS_TTL'),
          database: config.get<number>('REDIS_DATABASE'),
          username: config.get<string>('REDIS_USERNAME'),
          password: config.get<string>('REDIS_PASSWORD'),
        });
        return { store };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          type: 'mysql',
          host: config.get('MYSQL_HOST'),
          port: config.get('MYSQL_PORT'),
          username: config.get('MYSQL_USERNAME'),
          password: config.get('MYSQL_PASSWORD'),
          database: config.get('MYSQL_DATABASE'),
          autoLoadEntities: true,
          maxQueryExecutionTime: 1000,
          cache: true,
          charset: 'utf8mb4',
          logging: ['error', 'warn', 'info'],
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const redis = new Redis({
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          db: config.get('REDIS_DATABASE'),
          username: config.get('REDIS_USERNAME'),
          password: config.get('REDIS_PASSWORD'),
        });
        return {
          throttlers: [
            {
              ttl: seconds(60),
              limit: 60,
            },
          ],
          storage: new ThrottlerStorageRedisService(redis),
        };
      },
    }),
    MasterModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly ModuleRefHandle: ModuleRef) {}

  // 生成ormconfig.ts - 傻逼typeorm改版越改越傻逼
  public async onModuleInit(): Promise<void> {
    const TypeormOptions = this.ModuleRefHandle.get(TYPEORM_MODULE_OPTIONS, {
      strict: false,
    });

    const config: MysqlConnectionOptions = {
      ...TypeormOptions,
      migrations: ['dist/migrations/*.js'],
      entities: ['dist/**/*.entity.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };

    await outputFile(
      join(__dirname, '../ormconfig.js'),
      `"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.dataSourceOptions = void 0;\nconst typeorm_1 = require("typeorm");\nexports.dataSourceOptions = ${JSON.stringify(
        config,
        null,
        2,
      ).replace(
        /"([^"]+)":/g,
        '$1:',
      )};\nconst dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);\nexports.default = dataSource;`,
    );
  }
}
