import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGroupEntity, ChatGroupMemberEntity } from './chat-gropu.entity';
import { ChatGroupController } from './chat-group.controller';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupRepository } from './chat-group.repository';
import { ChatModule } from '../chat/chat.module';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatGroupMemberEntity, ChatGroupEntity]),
    ChatModule,
    SocketModule,
  ],
  controllers: [ChatGroupController],
  providers: [ChatGroupService, ChatGroupRepository],
  exports: [ChatGroupService, ChatGroupRepository],
})
export class ChatGroupModule {}
