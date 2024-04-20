import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('user is not authenticated.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(JSON.parse(token), {
        secret: 'anas',
      });

      request.user = { user: payload };
      request.body = { ...request.body, created_by: payload.id };
      return request;
    } catch (error) {
      console.log(error, 'error');
      throw new Error('invalid user.');
    }
  }
}
