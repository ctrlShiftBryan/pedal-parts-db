-- CreateTable
CREATE TABLE "Part" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "part" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "ordered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedal" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pedal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedalPart" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pedalId" INTEGER NOT NULL,
    "partId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "PedalPart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PedalPart" ADD CONSTRAINT "PedalPart_pedalId_fkey" FOREIGN KEY ("pedalId") REFERENCES "Pedal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedalPart" ADD CONSTRAINT "PedalPart_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
