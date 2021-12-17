import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertIntoUsers1639446633128 implements MigrationInterface {
    name = 'InsertIntoUsers1639446633128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level) VALUES('trainer@trainer.com', '123', 'TRAINER', 'trainer', 'trainer', 'white_belt')`);
        // await queryRunner.query(`INSERT INTO users (email, password, role, name, surname, level, trainerId) VALUES('learner@learner.com', '123', 'LEARNER', 'learner', 'learner', 'white_belt', '1')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
