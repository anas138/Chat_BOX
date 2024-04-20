import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repositroy';
import { ChatModel } from './chat-model';
@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async createMessage(chatBody: ChatModel) {
    return this.chatRepository.createMessage(chatBody);
  }

  async getMessages(userId: any) {
    return this.chatRepository.getUsers(userId);
  }

  async getGroupMessage(groupId: number, fromUserId: number) {
    return this.chatRepository.getGroupMessage(groupId, fromUserId);
  }
}
