/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Country";

-- CreateTable
CREATE TABLE "country" (
    "name" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "bg_image" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency" (
    "name" VARCHAR(255),
    "symbol" VARCHAR(255),
    "id" SERIAL NOT NULL,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_information" (
    "languages" VARCHAR[],
    "capital" VARCHAR(255),
    "population" INTEGER,
    "currency_id" INTEGER,
    "country_id" UUID NOT NULL,

    CONSTRAINT "country_information_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "country_requirements" (
    "minimal_student_visa_age" INTEGER,
    "education_requirements" VARCHAR,
    "nostrification" BOOLEAN,
    "financial_guarantees" INTEGER,
    "country_id" UUID NOT NULL,

    CONSTRAINT "country_requirements_pkey" PRIMARY KEY ("country_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar_url" VARCHAR(255),
    "is_activated" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "status_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "entity_type" VARCHAR(255) NOT NULL,
    "entity_id" UUID,
    "reviewed_by" UUID,
    "payload" JSONB,

    CONSTRAINT "edit_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets_statuses" (
    "status_id" SERIAL NOT NULL,
    "status_name" VARCHAR(20),

    CONSTRAINT "tickets_statuses_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "fields_of_study" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(150),

    CONSTRAINT "fields_of_study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs_of_study" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(150),

    CONSTRAINT "programs_of_study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100),
    "description" TEXT,
    "bg_image" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "created_by" UUID,
    "country_id" UUID,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities_information" (
    "university_id" UUID NOT NULL,
    "top" INTEGER,
    "city" VARCHAR(255),
    "students" INTEGER,
    "year_of_foundation" SMALLINT,

    CONSTRAINT "universities_information_pkey" PRIMARY KEY ("university_id")
);

-- CreateTable
CREATE TABLE "universities_requirements" (
    "university_id" UUID NOT NULL,
    "language_level" VARCHAR(4),
    "documents" VARCHAR(255)[],
    "deadline" DATE,

    CONSTRAINT "universities_requirements_pkey" PRIMARY KEY ("university_id")
);

-- CreateTable
CREATE TABLE "university_fields" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "university_id" UUID,
    "field_id" UUID,
    "name" VARCHAR(150),

    CONSTRAINT "university_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_programs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "university_fields_id" UUID,
    "name" VARCHAR(150),
    "description" TEXT,
    "program_of_study_id" UUID,

    CONSTRAINT "university_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_review" (
    "country_id" UUID NOT NULL,
    "review_id" UUID NOT NULL,

    CONSTRAINT "country_review_pkey" PRIMARY KEY ("country_id","review_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "is_recommended" BOOLEAN,
    "recommended" INTEGER,
    "unrecommended" INTEGER,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities_review" (
    "university_id" UUID NOT NULL,
    "review_id" UUID NOT NULL,

    CONSTRAINT "universities_review_pkey" PRIMARY KEY ("university_id","review_id")
);

-- AddForeignKey
ALTER TABLE "country_information" ADD CONSTRAINT "general_country_information_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "country_information" ADD CONSTRAINT "fk_currency" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "country_requirements" ADD CONSTRAINT "general_country_requirements_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "fk_status_id" FOREIGN KEY ("status_id") REFERENCES "tickets_statuses"("status_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "universities" ADD CONSTRAINT "fk_country_id" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "universities" ADD CONSTRAINT "universities_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "universities_information" ADD CONSTRAINT "universities_information_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "universities_requirements" ADD CONSTRAINT "universities_requirements_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "university_fields" ADD CONSTRAINT "fk_field_id" FOREIGN KEY ("field_id") REFERENCES "fields_of_study"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "university_fields" ADD CONSTRAINT "fk_university_id" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "university_programs" ADD CONSTRAINT "fk_program_of_study_id" FOREIGN KEY ("program_of_study_id") REFERENCES "programs_of_study"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "university_programs" ADD CONSTRAINT "university_programs_university_fields_id_fkey" FOREIGN KEY ("university_fields_id") REFERENCES "university_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "country_review" ADD CONSTRAINT "country_review_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "country_review" ADD CONSTRAINT "country_review_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "universities_review" ADD CONSTRAINT "universities_review_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "universities_review" ADD CONSTRAINT "universities_review_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
