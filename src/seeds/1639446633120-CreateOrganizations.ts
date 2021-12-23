import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrganizations1639446633120 implements MigrationInterface {
    name = 'CreateOrganizations1639446633120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO organizations (title) VALUES('test1')`);
        await queryRunner.query(`INSERT INTO organizations (title) VALUES('Karate')`);
        await queryRunner.query(`INSERT INTO organizations (title) VALUES('Kyokushinkay')`);
        await queryRunner.query(`INSERT INTO organizations (title) VALUES('Triada')`);
        // await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, trainerId) VALUES('learner@learner.com', '123', 'LEARNER', 'learner', 'learner', 'white_belt', '1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
