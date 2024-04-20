import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserLoginEntity } from '../users-login/user-login.entity';

@Entity()
export class ChatGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  group_name: string;
}

@Entity()
export class ChatGroupMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChatGroupEntity, (chatGroupEntity) => chatGroupEntity.id)
  @JoinColumn({ name: 'group_id' })
  groupName: ChatGroupEntity;
  @Column()
  group_id: number;

  @ManyToOne(() => UserLoginEntity, (userLoginEntity) => userLoginEntity.id)
  @JoinColumn({ name: 'user_id' })
  users: UserLoginEntity;
  @Column()
  user_id: number;
}
