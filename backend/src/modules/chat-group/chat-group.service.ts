import { Injectable } from '@nestjs/common';
import { ChatGroupRepository } from './chat-group.repository';
import { JwtService } from '@nestjs/jwt';
import { ChatModel, message_type } from '../chat/chat-model';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class ChatGroupService {
  constructor(
    private readonly chatGroupRepository: ChatGroupRepository,
    private readonly chatService: ChatService,
  ) {}

  async createGroup(body: any) {
    return this.chatGroupRepository.createGroup(body);
  }

  async getGroups() {
    return this.chatGroupRepository.getGroups();
  }
  async joinRoom(roomId: number, user: any) {
    return this.chatGroupRepository.joinRoom(roomId, user);
  }

  async groupMessage(groupId: number, fromUserId: number, body: any) {
    const payload = {
      from_user: fromUserId,
      message: body.message,
      message_type: message_type.GROUP,
      group_id: groupId,
      created_by: fromUserId,
    };
    return this.chatService.createMessage(payload);
  }

  async getGroupMessage(groupId: number, fromUserId: number) {
    return this.chatService.getGroupMessage(groupId, fromUserId);
  }
  async getGroupById(id: number) {
    return this.chatGroupRepository.getGroupById(id);
  }
  async getUsersByGroup(id: number) {
    return this.chatGroupRepository.getUsersByGroup(id);
  }
}
