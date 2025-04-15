/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,owner_id]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[first_name,last_name]` on the table `Vet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Owner_telephone_key" ON "Owner"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_name_owner_id_key" ON "Pet"("name", "owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vet_first_name_last_name_key" ON "Vet"("first_name", "last_name");
