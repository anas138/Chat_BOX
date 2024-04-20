import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserLoginEntity } from '../users-login/user-login.entity';

enum message_type {
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE',
}

@Entity()
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserLoginEntity, (userLoginEntity) => userLoginEntity.id)
  @JoinColumn({ name: 'to_user' })
  toUser: UserLoginEntity;
  @Column({ nullable: true })
  to_user: number;

  @ManyToOne(() => UserLoginEntity, (userLoginEntity) => userLoginEntity.id)
  @JoinColumn({ name: 'from_user' })
  fromUser: UserLoginEntity;
  @Column()
  from_user: number;

  @Column()
  message: string;

  @Column({ nullable: true, default: null })
  group_id: number;

  @Column({ type: 'enum', enum: message_type, nullable: false })
  message_type: message_type;

  @Column({ nullable: true, default: null })
  created_by: number;

  @Column({ nullable: true, default: null })
  updated_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
