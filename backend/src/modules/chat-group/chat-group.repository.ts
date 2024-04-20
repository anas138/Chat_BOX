import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChatGroupEntity, ChatGroupMemberEntity } from './chat-gropu.entity';
@Injectable()
export class ChatGroupRepository {
  constructor(
    @InjectRepository(ChatGroupEntity)
    private chatGroupRepository: Repository<ChatGroupEntity>,
    @InjectRepository(ChatGroupMemberEntity)
    private chatGroupMemberRepository: Repository<ChatGroupMemberEntity>,
  ) {}
  async createGroup(body: any) {
    return this.chatGroupRepository.save(body);
  }
  async getGroups() {
    return this.chatGroupRepository.find();
  }

  async joinRoom(roomId: number, userId: number) {
    const userExist = await this.chatGroupMemberRepository.findOne({
      where: {
        user_id: userId,
        group_id: roomId,
      },
    });

    if (!userExist) {
      const payload = {
        user_id: userId,
        group_id: roomId,
      };
      return this.chatGroupMemberRepository.save(payload);
    }

    return 'user already exists';
  }
}
