import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserLoginEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
