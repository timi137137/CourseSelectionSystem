import 'winston-daily-rotate-file';

import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { fastifyMultipart } from '@fastify/multipart';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { createLogger } from 'winston';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './app/http-exception.filter';
import { TransformInterceptor } from './app/transform.interceptor';
import CSPConfig from './config/csp';

const format = winston.format; // 太长了直接展开

export async function Bootstrap() {
  // 日志配置
  const loggerOptions = {
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  };
  const loggerTransports: any = [
    // 保存日志文件
    new winston.transports.DailyRotateFile({
      level: 'warn',
      dirname: 'logs/error',
      filename: 'error-%DATE%.log',
      ...loggerOptions,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.align(),
        format.printf((info) =>
          info.level != 'info'
            ? info.level == 'error'
              ? `${info.level}: ${[info.timestamp]}: ${info.message} \n${
                  info.stack
                }`
              : `${info.level}: ${[info.timestamp]}: ${info.message}`
            : '',
        ),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      dirname: 'logs/info',
      filename: 'info-%DATE%.log',
      ...loggerOptions,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.align(),
        format.printf((info) =>
          info.level == 'info'
            ? `${info.level}: ${[info.timestamp]}: ${info.message}`
            : '',
        ),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'debug',
      dirname: 'logs/debug',
      filename: 'debug-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '50m',
      maxFiles: '3d',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.align(),
        format.printf((info) =>
          info.level == 'debug'
            ? `${info.level}: ${[info.timestamp]}: ${info.message}`
            : info.level == 'verbose'
              ? `${info.level}: ${[info.timestamp]}: \n${info.message}`
              : '',
        ),
      ),
    }),
  ];
  if (process.env.DEBUG_MODE === 'true') {
    console.log(
      'Debug mode enabled, which may cause serious performance losses. Please disable it',
    );
    loggerTransports.push(
      // 控制台日志
      new winston.transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), utilities.format.nestLike()),
      }),
    );
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    {
      logger: WinstonModule.createLogger({
        instance: createLogger({ transports: loggerTransports }),
      }),
    },
  );
  const config = app.get(ConfigService);

  // Swagger 文档
  if (config.get('DEBUG_MODE') === 'true') {
    const documentConfig = new DocumentBuilder()
      .setTitle('Course Selection API')
      .setDescription('Course Selection controller API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup('doc', app, document);
  }

  // Cookie解析器
  await app.register(fastifyCookie, {
    secret: config.get<string>('COOKIE_TOKEN'),
  });
  app.enableCors({ credentials: true, origin: true }); // 跨域
  await app.register(helmet, {
    contentSecurityPolicy: CSPConfig,
  }); // 安全组件
  await app.register(fastifyMultipart); // 文件上传

  // 全局验证
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const logger = app.get(Logger);
  app.useGlobalFilters(new HttpExceptionFilter(logger)); // 全局错误过滤器
  app.useGlobalInterceptors(new TransformInterceptor(logger)); // 全局拦截器
  // 版本控制
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(config.get<number>('PORT', 25565), '0.0.0.0');
}
