import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Training } from "../training/training.entity";


@Entity('user_training')
export class UserTraining extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User,user => user.userTrainings)
  @JoinColumn({name: 'userId'})
  user: User;

  @ManyToOne(() => User,user => user.userTrainings)
  @JoinColumn({name: 'trainingId'})
  training: Training;
}