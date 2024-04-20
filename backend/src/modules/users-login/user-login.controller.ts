import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('user-login')
export class UserLoginController {
  constructor(private readonly UserLoginService: UserLoginService) {}

  @Post('/')
  async createLogin(@Body() body: any) {
    return this.UserLoginService.createLogin(body);
  }
  @UseGuards(AuthGuard)
  @Get('/')
  async getUsers(@Req() req: any) {
    const { user } = req.user;
    return this.UserLoginService.getUsers(user);
  }
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return this.UserLoginService.getUserById(id);
  }
}
