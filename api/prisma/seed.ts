/** we need to seed the db with actual data! */

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

/** potentially ENUMS? */
const CHARACTERISTICS_MAP: Record<string, number> = {
  "Plastic-Free": 2,
  Vegan: 1,
  "Locally Produced": 1,
  Humane: 1,
  Healthy: 1,
  Wasteful: -1,
  Unhealthy: -1,
};

const CHOOSE_RANDOM_CHARACTERISTICS: number = 4;

/** Helper::: randomly choose between 1 and 4 characteristics (it's good enough) */
const adequatelyRandomShuffle = <T>(arr: T[], toChoose: number = 4): T[] => {
  /** create a new array of the same length as the original, and then sort it */
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  //   get number between 1 - 4
  const numToChoose = Math.floor(Math.random() * toChoose) + 1;
  return shuffled.slice(0, numToChoose);
};

const main = async (): Promise<void> => {
  console.log("...seeding the database w/ random data");

  // ensure this is idempotent, if data already exists in the db, then return nothing
  const existingUsers = await prisma.user.findMany();
  if (existingUsers.length > 0) {
    console.log("The database is already seeded. Skipping");
    return;
  }

  console.log("* Seeding `User` table...");
  await prisma.user.createMany({
    // create 10 random users
    data: Array.from({ length: 10 }).map(() => {
      return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        // NOTE:IMPORTANT: passwords should never be plaintext in an actual app (hashed and salted)
        password: faker.internet.password(),
        highHorse: faker.number.int({ min: 0, max: 500 }),
      };
    }),
    /** we also need to create our mocked user, Seth Balodi */
  });

  /** seed products */
  console.log("* Seeding `Product` table");
  await prisma.product.createMany({
    data: Array.from({ length: 50 }).map(() => {
      /** randomly get between 1 and 4 characteristics */
      const randomCharacteristics: string[] = adequatelyRandomShuffle(
        Object.keys(CHARACTERISTICS_MAP) as string[],
        CHOOSE_RANDOM_CHARACTERISTICS as number
      );

      /** reduce produces a single value */
      const sustainabuyScore: number = randomCharacteristics.reduce(
        (score, characteristic) =>
          score + CHARACTERISTICS_MAP[`${characteristic}`],
        0
      );

      return {
        name: faker.commerce.productName() as String,
        price: parseFloat(
          faker.commerce.price({ min: 3, max: 1000 })
        ) as number,
        imageUrl: faker.image.urlPicsumPhotos() as string,
        description: faker.commerce.productDescription() as string,
        characteristics: randomCharacteristics,
        sustainabuyScore,
      };
    }),
  });

  console.log("* Seeding `Order` table");
  for (let i = 0; i < 10; i++) {}

  console.log("...database seeding complete!");
};
