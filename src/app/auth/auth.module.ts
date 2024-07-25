import { Buffer } from 'node:buffer';

import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../strategy/jwt.strategy';
import { LocalStrategy } from '../strategy/local.strategy';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        let encoder = new TextEncoder();

        const publicKeyBuffer = Buffer.from(
          config.get<string>('JWT_PUBLIC_KEY')!,
          'utf8',
        );
        const privateKeyBuffer = Buffer.from(
          config.get<string>('JWT_PRIVATE_KEY')!,
          'utf8',
        );
        return {
          publicKey: publicKeyBuffer.toString(),
          privateKey: privateKeyBuffer.toString(),
          signOptions: {
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, LocalStrategy, JwtStrategy, Logger],
  exports: [JwtModule],
})
export class AuthModule {}
