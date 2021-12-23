import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../user/user.entity";

export class InsertIntoUsers1639446633122 implements MigrationInterface {
    name = 'InsertIntoUsers1639446633122'

    public async up(queryRunner: QueryRunner): Promise<void> {
      //Password = 123
        await queryRunner
          .manager
          .createQueryBuilder()
          .insert()
          .into("users")
          .values([
            {
              email: "admin@admin.com",
              password: "$2b$05$/fwCeesrEemQZKd.xXzjwe.g2k7eUUzFlW2dQNvTVIn2jxw.PQFSa",
              role: "ADMIN",
              name: "admin",
              surname: "admin",
              level: "black_belt",
              organizationIds: [1, 2],
              regionId: 1,
            },
            {
              email: "trainer@trainer.com",
              password: "$2b$05$/fwCeesrEemQZKd.xXzjwe.g2k7eUUzFlW2dQNvTVIn2jxw.PQFSa",
              role: "TRAINER",
              name: "trainer",
              surname: "trainer",
              level: "black_belt",
              organizationIds: [1, 3],
              regionId: 2,
            },
            {
              email: "learner@learner.com",
              password: "$2b$05$/fwCeesrEemQZKd.xXzjwe.g2k7eUUzFlW2dQNvTVIn2jxw.PQFSa",
              role: "LEARNER",
              name: "learner",
              surname: "learner",
              level: "white_belt",
              organizationIds: [1, 3],
              trainerId: 2,
              regionId: 2,
            },
          ])
          .execute()
        // await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, organizationIds, regionId) VALUES('admin@admin.com', '123', 'ADMIN', 'admin', 'admin', 'black_belt', '[1, 2]', '2')`);
        // await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, trainerId) VALUES('learner@learner.com', '123', 'LEARNER', 'learner', 'learner', 'white_belt', '1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
