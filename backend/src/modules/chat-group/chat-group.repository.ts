import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketGateway } from '../socket/socket.gateway';

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
    private readonly socketGateway: SocketGateway,
  ) {}
  async createGroup(body: any) {
    return this.chatGroupRepository.save(body);
  }
  async getGroups() {
    return this.chatGroupRepository.find();
  }

  async joinRoom(roomId: number, user: any) {
    const userExist = await this.chatGroupMemberRepository.findOne({
      where: {
        user_id: user.id,
        group_id: roomId,
      },
    });

    if (!userExist) {
      const payload = {
        user_id: user.id,
        group_id: roomId,
      };
      const member = await this.chatGroupMemberRepository.save(payload);
      await this.socketGateway.groupNotification({
        roomId: roomId,
        joinUser: user,
      });
      return member;
    }

    return 'user already exists';
  }

  async getGroupById(id: number) {
    return this.chatGroupRepository.find({ where: { id: id } });
  }

  async getUsersByGroup(id: number) {
    return this.chatGroupMemberRepository.find({ where: { group_id: id } });
  }
}
