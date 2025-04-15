-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "type_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vet" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "Vet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "visit_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "vet_id" INTEGER NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VetSpecialties" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VetSpecialties_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Pet_owner_id_idx" ON "Pet"("owner_id");

-- CreateIndex
CREATE INDEX "Pet_type_id_idx" ON "Pet"("type_id");

-- CreateIndex
CREATE UNIQUE INDEX "PetType_name_key" ON "PetType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- CreateIndex
CREATE INDEX "Visit_pet_id_idx" ON "Visit"("pet_id");

-- CreateIndex
CREATE INDEX "Visit_vet_id_idx" ON "Visit"("vet_id");

-- CreateIndex
CREATE INDEX "_VetSpecialties_B_index" ON "_VetSpecialties"("B");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "PetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_vet_id_fkey" FOREIGN KEY ("vet_id") REFERENCES "Vet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VetSpecialties" ADD CONSTRAINT "_VetSpecialties_A_fkey" FOREIGN KEY ("A") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VetSpecialties" ADD CONSTRAINT "_VetSpecialties_B_fkey" FOREIGN KEY ("B") REFERENCES "Vet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
