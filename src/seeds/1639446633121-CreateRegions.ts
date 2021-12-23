import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRegions1639446633121 implements MigrationInterface {
    name = 'CreateRegions1639446633121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
          .manager
          .createQueryBuilder()
          .insert()
          .into("regions")
          .values([
              { title: "Donetsk", subscriptionPrice: 500 },
              { title: "Kyiv", subscriptionPrice: 800 },
              { title: "Lugansk", subscriptionPrice: 450 },
          ])
          .execute()
        // await queryRunner.query(`INSERT INTO regions (title, subscriptionPrice) VALUES('Donetsk', '500')`);
        // await queryRunner.query(`INSERT INTO regions (title, subscriptionPrice) VALUES('Kyiv', '800')`);
        // await queryRunner.query(`INSERT INTO regions (title, subscriptionPrice) VALUES('Lugansk', '450')`);
        // await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, trainerId) VALUES('learner@learner.com', '123', 'LEARNER', 'learner', 'learner', 'white_belt', '1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
