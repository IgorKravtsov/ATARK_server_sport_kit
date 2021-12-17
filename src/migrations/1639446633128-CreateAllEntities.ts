import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAllEntities1639446633128 implements MigrationInterface {
    name = 'CreateAllEntities1639446633128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organizations" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_6b031fcd0863e3f6b44230163f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriptionTypes" ("id" SERIAL NOT NULL, "amountDays" integer NOT NULL, "amountTrainings" integer NOT NULL, "price" numeric DEFAULT '0', "organizationId" integer, CONSTRAINT "PK_b97493174b39f5357c087e3886f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "activationDate" TIMESTAMP, "deActivationDate" TIMESTAMP, "trainingLeft" integer NOT NULL, "userId" integer, "subscriptionTypeId" integer, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "subscriptionPrice" numeric NOT NULL DEFAULT '0', "title" character varying NOT NULL, "headTrainerId" integer, CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gyms" ("id" SERIAL NOT NULL, "title" character varying, "address" character varying NOT NULL, CONSTRAINT "PK_fe765086496cf3c8475652cddcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "trainings" ("id" SERIAL NOT NULL, "trainingDate" TIMESTAMP NOT NULL, "trainingType" character varying NOT NULL, "trainerId" integer, "gymId" integer, CONSTRAINT "PK_b67237502b175163e47dc85018d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'TRAINER', 'LEARNER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "level" character varying, "role" "public"."users_role_enum" NOT NULL, "trainerId" integer, "regionId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "characteristics" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "value" integer NOT NULL, "saveDate" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_a64133a287a0f2d735da40fcd89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization_user" ("organization_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_902dc005457d79e570677b8a098" PRIMARY KEY ("organization_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2aaa5ea0d28c4e9196b107781" ON "organization_user" ("organization_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f29cfb2e32f6d58394bf0ce7e5" ON "organization_user" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user_training" ("training_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_b434de8f1f7c7549ae52ccd3406" PRIMARY KEY ("training_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aed1505b5452e96a0f3ebab68f" ON "user_training" ("training_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1dcf26aa5b956e6bf411a93be5" ON "user_training" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "subscriptionTypes" ADD CONSTRAINT "FK_84c6f74dd23f4caf3832fe5fdcc" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_c4306c5d66910503ee0200c82e9" FOREIGN KEY ("subscriptionTypeId") REFERENCES "subscriptionTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "regions" ADD CONSTRAINT "FK_439230804b7a2f914f5e67560c3" FOREIGN KEY ("headTrainerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_f9b7be8602a190000a0b4b9a350" FOREIGN KEY ("trainerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trainings" ADD CONSTRAINT "FK_d6e5982b34b242467a19a989047" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_ac024a97e86b515d4da0c39470b" FOREIGN KEY ("trainerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2c69c851bdaed5b02825d6f6d50" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "characteristics" ADD CONSTRAINT "FK_0f0c8eb457ca2247013c2f1f03b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_user" ADD CONSTRAINT "FK_e2aaa5ea0d28c4e9196b107781e" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organization_user" ADD CONSTRAINT "FK_f29cfb2e32f6d58394bf0ce7e5c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_training" ADD CONSTRAINT "FK_aed1505b5452e96a0f3ebab68f0" FOREIGN KEY ("training_id") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_training" ADD CONSTRAINT "FK_1dcf26aa5b956e6bf411a93be54" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_training" DROP CONSTRAINT "FK_1dcf26aa5b956e6bf411a93be54"`);
        await queryRunner.query(`ALTER TABLE "user_training" DROP CONSTRAINT "FK_aed1505b5452e96a0f3ebab68f0"`);
        await queryRunner.query(`ALTER TABLE "organization_user" DROP CONSTRAINT "FK_f29cfb2e32f6d58394bf0ce7e5c"`);
        await queryRunner.query(`ALTER TABLE "organization_user" DROP CONSTRAINT "FK_e2aaa5ea0d28c4e9196b107781e"`);
        await queryRunner.query(`ALTER TABLE "characteristics" DROP CONSTRAINT "FK_0f0c8eb457ca2247013c2f1f03b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2c69c851bdaed5b02825d6f6d50"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_ac024a97e86b515d4da0c39470b"`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_d6e5982b34b242467a19a989047"`);
        await queryRunner.query(`ALTER TABLE "trainings" DROP CONSTRAINT "FK_f9b7be8602a190000a0b4b9a350"`);
        await queryRunner.query(`ALTER TABLE "regions" DROP CONSTRAINT "FK_439230804b7a2f914f5e67560c3"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_c4306c5d66910503ee0200c82e9"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_fbdba4e2ac694cf8c9cecf4dc84"`);
        await queryRunner.query(`ALTER TABLE "subscriptionTypes" DROP CONSTRAINT "FK_84c6f74dd23f4caf3832fe5fdcc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1dcf26aa5b956e6bf411a93be5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aed1505b5452e96a0f3ebab68f"`);
        await queryRunner.query(`DROP TABLE "user_training"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f29cfb2e32f6d58394bf0ce7e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2aaa5ea0d28c4e9196b107781"`);
        await queryRunner.query(`DROP TABLE "organization_user"`);
        await queryRunner.query(`DROP TABLE "characteristics"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "trainings"`);
        await queryRunner.query(`DROP TABLE "gyms"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "subscriptionTypes"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
    }

}
