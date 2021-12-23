import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedConstraintsOfUniqueValues1640226403631 implements MigrationInterface {
    name = 'AddedConstraintsOfUniqueValues1640226403631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "UQ_0f648c5ba1ac0e8674c053f8fff" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "regions" ADD CONSTRAINT "UQ_9e0491ce070cc63ea3e8c71f2cf" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "gyms" ADD CONSTRAINT "UQ_cfae51823630f481916c4aa4f16" UNIQUE ("address")`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "trainingDate"`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD "trainingDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trainings" DROP COLUMN "trainingDate"`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD "trainingDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gyms" DROP CONSTRAINT "UQ_cfae51823630f481916c4aa4f16"`);
        await queryRunner.query(`ALTER TABLE "regions" DROP CONSTRAINT "UQ_9e0491ce070cc63ea3e8c71f2cf"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "UQ_0f648c5ba1ac0e8674c053f8fff"`);
    }

}
