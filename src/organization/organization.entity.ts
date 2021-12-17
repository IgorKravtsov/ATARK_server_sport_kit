import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { SubscriptionType } from "../subscription-type/subscription-type.entity";
import { User } from "../user/user.entity";

@Entity('organizations')
export class Organization extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column({
  //     type:"numeric",
  //     default: 0
  // })
  // trainingPrice: number;
  //
  // @Column({
  //     type:"numeric",
  //     default: 0
  // })
  // subscriptionPrice: number;

  @OneToMany(
    () => SubscriptionType,
    subscriptionType => subscriptionType.organization
  )
  subscriptionTypes: SubscriptionType[];

  @ManyToMany(
    () => User
  )
  @JoinTable({
    name: "organization_user",
    joinColumn: {
      name: "organization_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users: User[]

}