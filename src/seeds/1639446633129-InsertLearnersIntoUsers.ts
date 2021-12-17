import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertLearnersIntoUsers1639446633128 implements MigrationInterface {
    name = 'InsertLearnersIntoUsers1639446633128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, trainerId) VALUES('learner@learner.com', '123', 'TRAINER', 'learner', 'learner', 'white_belt', 1)`);
        // await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, trainerId) VALUES('learner@learner.com', '123', 'LEARNER', 'learner', 'learner', 'white_belt', '1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
