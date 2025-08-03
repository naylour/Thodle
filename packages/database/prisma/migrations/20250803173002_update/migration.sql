-- AlterTable
ALTER TABLE "user"."Users" ALTER COLUMN "avatar" DROP NOT NULL;

-- CreateTable
CREATE TABLE "user"."MaxAccounts" (
    "id" TEXT NOT NULL,
    "max_id" BIGINT NOT NULL,
    "last_name" TEXT,
    "first_name" TEXT NOT NULL,
    "username" TEXT,
    "user" TEXT NOT NULL,
    "lang" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaxAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaxAccounts_max_id_key" ON "user"."MaxAccounts"("max_id");

-- CreateIndex
CREATE UNIQUE INDEX "MaxAccounts_username_key" ON "user"."MaxAccounts"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MaxAccounts_user_key" ON "user"."MaxAccounts"("user");

-- AddForeignKey
ALTER TABLE "user"."MaxAccounts" ADD CONSTRAINT "MaxAccounts_user_fkey" FOREIGN KEY ("user") REFERENCES "user"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
