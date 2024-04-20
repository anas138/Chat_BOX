export enum message_type {
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE',
}

export class ChatModel {
  id?: number;
  to_user?: number;
  from_user: number;
  message: string;
  message_type: message_type;
  group_id?: number;
  created_by?: number;
  update_by?: number;
  created_at?: Date;
  update_at?: Date;
}
