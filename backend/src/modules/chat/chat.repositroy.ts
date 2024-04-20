import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { Repository } from 'typeorm';
import { ChatModel } from './chat-model';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {}

  async createMessage(chatBody: ChatModel) {
    return this.chatRepository.save(chatBody);
  }

  async getUsers(userId: any) {
    // const messages = await this.chatRepository.find({
    //   where: [
    //     { to_user: userId.to_user },
    //     { from_user: userId.to_user },
    //     { created_by: userId.from_user },
    //   ],
    // });

    const messages = await this.chatRepository.query(`
      SELECT * 
      FROM chat_entity c
      WHERE (c.to_user='${userId.to_user}' OR c.from_user='${userId.to_user}') AND (c.to_user='${userId.from_user}' OR c.from_user='${userId.from_user}')
      `);
    return messages;
  }

  async getGroupMessage(groupId: number, fromUserId: number) {
    const query = await this.chatRepository.query(`
      SELECT * 
      FROM chat_entity c
      WHERE c.group_id='${groupId}' 
    `);
    return query;
  }
}
