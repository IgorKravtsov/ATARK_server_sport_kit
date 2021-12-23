import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { User } from "../user/user.entity";

@Entity('regions')
export class Region extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
    type: "numeric"
  })
  subscriptionPrice: number;

  @ManyToOne(
    () => User,
    user => user.regionHeadTrainer
  )
  @JoinColumn({
    name: 'headTrainerId'
  })
  headTrainer: User

  @OneToMany(
    () => User,
    user => user.region
  )
  users: User[]

  @Column({ unique: true })
  title: string;

}