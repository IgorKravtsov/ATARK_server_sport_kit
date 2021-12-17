import { Module } from '@nestjs/common';
import { SubscriptionTypeService } from './subscription-type.service';
import { SubscriptionTypeController } from './subscription-type.controller';

@Module({
  providers: [SubscriptionTypeService],
  controllers: [SubscriptionTypeController]
})
export class SubscriptionTypeModule {}
