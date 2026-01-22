-- CreateTable
CREATE TABLE "verification_codes" (
    "code" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "expiration_time" TIMESTAMP(6) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_codes_code_key" ON "verification_codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "verification_codes_email_key" ON "verification_codes"("email");
