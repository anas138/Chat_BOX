import { Module } from '@nestjs/common';
import { UserLoginController } from './user-login.controller';
import { UserLoginService } from './user-login.service';
import { UserLoginRepository } from './user-login.repositroy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoginEntity } from './user-login.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLoginEntity]),
    JwtModule.register({
      global: true,
      secret: 'anas',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UserLoginController],
  providers: [UserLoginRepository, UserLoginService],
  exports: [UserLoginService, UserLoginRepository],
})
export class UserLoginModule {}
