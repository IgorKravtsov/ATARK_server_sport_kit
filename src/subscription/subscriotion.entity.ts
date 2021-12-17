import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "../user/user.entity";
import { SubscriptionType } from "../subscription-type/subscription-type.entity";

@Entity('subscriptions')
export class Subscription extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  activationDate: Date;

  @Column({
    nullable: true,
  })
  deActivationDate: Date;

  @Column()
  trainingLeft: number;

  @ManyToOne(
    () => User,
    user => user.subscriptions
  )
  @JoinColumn({
    name: 'userId'
  })
  user: User

  @ManyToOne(
    () => SubscriptionType,
    subscriptionType => subscriptionType.subscriptions
  )
  @JoinColumn({
    name: 'subscriptionTypeId'
  })
  subscriptionType: SubscriptionType

}