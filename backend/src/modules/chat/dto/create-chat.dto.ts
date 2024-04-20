import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

enum message_type {
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE',
}

export class CreateChatDto {
  @IsNumber()
  to_user: number;

  @IsNumber()
  from_user: number;

  @IsString()
  message: string;

  @IsEnum(message_type)
  message_type: message_type;

  @IsOptional()
  created_by: number;
}
