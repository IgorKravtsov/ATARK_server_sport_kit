import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "../user/user.entity";

@Entity('characteristics')
export class Characteristic extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  saveDate: Date;

  @ManyToOne(() => User,user => user.characteristics)
  @JoinColumn({
    name: 'userId'
  })
  user: User
}