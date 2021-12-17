import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Organization } from "../organization/organization.entity";
import { Subscription } from "../subscription/subscriotion.entity";


@Entity('subscriptionTypes')
export class SubscriptionType extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amountDays: number;

  @Column()
  amountTrainings: number;

  @Column({
    type: "numeric",
    default: 0,
    nullable: true,
  })
  price: number;

  @ManyToOne(
    () => Organization,
    organization => organization.subscriptionTypes
  )
  @JoinColumn({
    name: 'organizationId'
  })
  organization: Organization

  @OneToMany(
    () => Subscription,
    subscription => subscription.subscriptionType
  )
  subscriptions: Subscription[];

}