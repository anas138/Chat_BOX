import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLoginModule } from './modules/users-login/user-login.module';
import { UserLoginEntity } from './modules/users-login/user-login.entity';
import { ChatEntity } from './modules/chat/chat.entity';
import { ChatModule } from './modules/chat/chat.module';
import { SocketModule } from './modules/socket/socket.module';
import { ChatGroupModule } from './modules/chat-group/chat-group.module';
import {
  ChatGroupEntity,
  ChatGroupMemberEntity,
} from './modules/chat-group/chat-gropu.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'chat_box',
      entities: [
        UserLoginEntity,
        ChatEntity,
        ChatGroupMemberEntity,
        ChatGroupEntity,
      ],
      synchronize: true,
    }),
    UserLoginModule,
    ChatModule,
    SocketModule,
    ChatGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
