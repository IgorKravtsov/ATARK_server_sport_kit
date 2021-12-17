import {
  BaseEntity, BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {UserRoles} from "./types/userRoles.enum";
import {IsEmail} from "class-validator";
import { Characteristic } from "../characteristic/characteristic.entity";
import { Subscription } from "../subscription/subscriotion.entity";
import { Region } from "../region/region.entity";
import { Training } from "../training/training.entity";
import { Organization } from "../organization/organization.entity";
import { hash } from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({
    unique:true
  })
  @IsEmail()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    nullable: true
  })
  level: string;

  @Column({
    type:"enum",
    enum: UserRoles
  })
  role: string;

  @OneToMany(
    () => User,
    user => user.trainer
  )
  trainers: User[];

  @ManyToOne(
    () => User,
    user => user.trainers
  )
  @JoinColumn({
    name: 'trainerId'
  })
  trainer: User;


  @OneToMany(
    () => Characteristic,
    characteristic => characteristic.user
  )
  characteristics: Characteristic[];

  @OneToMany(
    () => Subscription,
    subscription => subscription.user
  )
  subscriptions: Subscription[];

  @OneToMany(
    () => Region,
    region => region.headTrainer
  )
  regionHeadTrainer: Region;

  @ManyToOne(
    () => Region,
    region => region.users
  )
  @JoinColumn({
    name: 'regionId'
  })
  region: Region;

  @OneToMany(
    () => Training,
    training => training.trainer
  )
  trainings: Training[];

  @ManyToMany(
    () => Training
  )
  trainingsForLearners: Training[];

  @ManyToMany(
    () => Organization
  )
  organizations: Organization[];


  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}