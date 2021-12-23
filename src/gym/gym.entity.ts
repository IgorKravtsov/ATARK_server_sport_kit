import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Training } from "../training/training.entity";

@Entity('gyms')
export class Gym extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  title: string;

  @Column({unique: true})
  address: string;

  @OneToMany(
    () => Training,
    training => training.gym
  )
  trainings: Training[]
}