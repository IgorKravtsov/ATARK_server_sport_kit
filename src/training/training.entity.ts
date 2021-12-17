import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "../user/user.entity";
import { Gym } from "../gym/gym.entity";

@Entity('trainings')
export class Training extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainingDate: Date;

  @Column()
  trainingType: string;

  // @Column({
  //     type: "numeric",
  //     default: 0,
  //     nullable: true,
  // })
  // price: number;

  @ManyToOne(
    () => User,
    user => user.trainings
  )
  @JoinColumn({
    name: 'trainerId'
  })
  trainer: User

  @ManyToOne(
    () => Gym,
    gym => gym.trainings
  )
  @JoinColumn({
    name: 'gymId'
  })
  gym: Gym


  @ManyToMany(
    () => User
  )
  @JoinTable({
    name: "user_training",
    joinColumn: {
      name: "training_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users: User[]
}