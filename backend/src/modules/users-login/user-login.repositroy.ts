import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginEntity } from './user-login.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserLoginRepository {
  constructor(
    @InjectRepository(UserLoginEntity)
    private userLoginRepository: Repository<UserLoginEntity>,
  ) {}

  async loginCreate(body: any) {
    const { username, password } = body;
    const checkUser = await this.userLoginRepository.findOne({
      where: { username: username },
    });

    if (!checkUser) {
      try {
        const saltRounds = 10;
        const satRound = await bcrypt.genSalt(saltRounds);
        const hashPass = await bcrypt.hash(password, satRound);
        const loginUserPayload = {
          username: username,
          password: hashPass,
        };

        return this.userLoginRepository.save(loginUserPayload);
      } catch (error) {
        console.log(error, 'error');
      }
    }

    //login
    const checkUserNamePassword = await this.userLoginRepository.findOne({
      where: { username: username },
    });
    const checkPassword = await bcrypt.compare(
      password,
      checkUserNamePassword.password,
    );
    if (checkUserNamePassword && checkPassword) {
      return { ...checkUserNamePassword };
    }
  }

  async getUsers(user: any) {
    return this.userLoginRepository.find({ where: { id: Not(user.id) } });
  }
  async getUserById(id: number) {
    return this.userLoginRepository.findOne({ where: { id: id } });
  }
}
