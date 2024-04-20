import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { AuthGuard } from 'src/guards/auth.guards';
@UseGuards(AuthGuard)
@Controller('group')
export class ChatGroupController {
  constructor(private readonly chatGroupService: ChatGroupService) {}

  @Post('/')
  async createGroup(@Body() body: any) {
    return this.chatGroupService.createGroup(body);
  }
  @Get('/')
  async getgroups() {
    return this.chatGroupService.getGroups();
  }

  @Post('join/group/:id')
  async joinGroup(@Param('id') id: number, @Req() req: any) {
    const { user } = req.user;
    console.log(user, 'uuuuuuu');
    console.log('anas');
    return this.chatGroupService.joinRoom(id, user.id);
  }

  @Post('/:id/message')
  async groupMessage(
    @Param('id') id: number,
    @Req() req: any,
    @Body() body: any,
  ) {
    const { user } = req.user;

    return this.chatGroupService.groupMessage(id, user.id, body);
  }

  @Get('/:id/message')
  async getMessageByGroupMembers(
    @Param('id') groupId: number,
    @Req() req: any,
  ) {
    const { user } = req.user;
    return this.chatGroupService.getGroupMessage(groupId, +user.id);
  }
}
