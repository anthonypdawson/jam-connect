/*
  Warnings:

  - You are about to drop the column `instruments` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "public"."ExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL');

-- DropForeignKey
ALTER TABLE "public"."profile_intent" DROP CONSTRAINT "profile_intent_userId_fkey";

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "instruments",
DROP COLUMN "location",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "gender" "public"."Gender",
ADD COLUMN     "genres" JSONB,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastActiveAt" TIMESTAMP(3),
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "socialLinks" JSONB,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "zipCode" TEXT;

-- CreateTable
CREATE TABLE "public"."user_instrument" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "instrument" TEXT NOT NULL,
    "experienceLevel" "public"."ExperienceLevel" NOT NULL,
    "yearsExperience" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_instrument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_instrument_userId_instrument_key" ON "public"."user_instrument"("userId", "instrument");

-- AddForeignKey
ALTER TABLE "public"."user_instrument" ADD CONSTRAINT "user_instrument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profile_intent" ADD CONSTRAINT "profile_intent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
