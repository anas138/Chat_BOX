import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { Request } from 'express';
@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('/')
  async createMessage(@Body() chatBody: CreateChatDto) {
    return this.chatService.createMessage(chatBody);
  }

  @Get('/user/:id')
  async getMessages(@Param('id') id: number, @Req() request: any) {
    const { user } = request;
    const userId = { to_user: +id, from_user: user.user.id };
    return this.chatService.getMessages(userId);
  }
}
