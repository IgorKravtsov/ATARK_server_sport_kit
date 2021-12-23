import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CharacteristicModule } from "./characteristic/characteristic.module";
import { GymModule } from "./gym/gym.module";
import { TrainingModule } from "./training/training.module";
import { RegionModule } from "./region/region.module";
import { UserModule } from "./user/user.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { SubscriptionTypeService } from "./subscription-type/subscription-type.service";
import { SubscriptionTypeModule } from "./subscription-type/subscription-type.module";
import { AuthMiddleware } from "./user/middlewares/auth.middleware";
import { OrganizationModule } from "./organization/organization.module";
import ormconfig from "./ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CharacteristicModule,
    GymModule,
    TrainingModule,
    RegionModule,
    UserModule,
    SubscriptionModule,
    SubscriptionTypeModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, SubscriptionTypeService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    })
  }

}
