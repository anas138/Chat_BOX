import { Injectable } from '@nestjs/common';
import { UserLoginRepository } from './user-login.repositroy';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserLoginService {
  constructor(
    private readonly userLoginRepository: UserLoginRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createLogin(body: any) {
    const user = await this.userLoginRepository.loginCreate(body);
    const payload = { ...user };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token: access_token,
    };
  }
  async getUsers(user: any) {
    const users = await this.userLoginRepository.getUsers(user);
    return users;
  }

  async getUserById(id: number) {
    return this.userLoginRepository.getUserById(id);
  }
}
