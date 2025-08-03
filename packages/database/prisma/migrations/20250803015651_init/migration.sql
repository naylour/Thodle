-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateTable
CREATE TABLE "user"."TelegramAccounts" (
    "id" TEXT NOT NULL,
    "tg_id" BIGINT NOT NULL,
    "last_name" TEXT,
    "first_name" TEXT NOT NULL,
    "username" TEXT,
    "user" TEXT NOT NULL,
    "lang" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelegramAccounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."Users" (
    "id" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "last_name" TEXT,
    "first_name" TEXT NOT NULL,
    "patronymic" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramAccounts_tg_id_key" ON "user"."TelegramAccounts"("tg_id");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramAccounts_username_key" ON "user"."TelegramAccounts"("username");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramAccounts_user_key" ON "user"."TelegramAccounts"("user");

-- AddForeignKey
ALTER TABLE "user"."TelegramAccounts" ADD CONSTRAINT "TelegramAccounts_user_fkey" FOREIGN KEY ("user") REFERENCES "user"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
