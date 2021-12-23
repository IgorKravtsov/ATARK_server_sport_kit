import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../user/user.entity";

export class InsertIntoGyms1639446633123 implements MigrationInterface {
    name = 'InsertIntoGyms1639446633123'

    public async up(queryRunner: QueryRunner): Promise<void> {
      //Password = 123
        await queryRunner
          .manager
          .createQueryBuilder()
          .insert()
          .into("gyms")
          .values([
            {
              title: "Романтика",
              address: "ул. Пушкина, дом Колотушкина"
            },
            {
              title: "Зал школы № 15 г.Харькова",
              address: "ул. Пушкина, дом Колотушкина 23"
            },
            {
              title: "Sport club №3",
              address: "ул. Пушкина, дом Колотушкина 24"
            },
            {
              title: "Sport club №4",
              address: "ул. Пушкина, дом Колотушкина 25"
            },
          ])
          .execute()
        // await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, organizationIds, regionId) VALUES('admin@admin.com', '123', 'ADMIN', 'admin', 'admin', 'black_belt', '[1, 2]', '2')`);
        // await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, trainerId) VALUES('learner@learner.com', '123', 'LEARNER', 'learner', 'learner', 'white_belt', '1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
