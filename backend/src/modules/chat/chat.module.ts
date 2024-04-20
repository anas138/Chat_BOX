import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repositroy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity])],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  exports: [ChatService, ChatRepository],
})
export class ChatModule {}
