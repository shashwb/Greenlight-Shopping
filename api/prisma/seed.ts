/** we need to seed the db with actual data! */

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

/** define interfaces for type safety **/
interface CharacteristicScore {
  [key: string]: number;
}

interface CharacteristicData {
  name: string;
}

interface ProductData {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  characteristics: string[];
  sustainabuyScore: number;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  highHorse: number;
}

// join table object
interface OrderProductData {
  productId: number;
  quantity: number;
}

interface OrderData {
  userId: number;
  createdAt: Date;
  items: OrderProductData[];
}

const CHARACTERISTICS_SCORES: CharacteristicScore = {
  "Plastic-Free": 2,
  Vegan: 1,
  "Locally Produced": 1,
  Humane: 1,
  Healthy: 1,
  Wasteful: -1,
  Unhealthy: -1,
};

const CHOOSE_RANDOM_CHARACTERISTICS: number = 4;

/** helper functions */
const generateUser = (): UserData => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    // NOTE:IMPORTANT: passwords should never be plaintext in an actual app (hashed and salted)
    password: faker.internet.password(),
    highHorse: faker.number.int({ min: 0, max: 500 }),
  };
};

const generateProduct = (): ProductData => {
  const randomCharacteristics: string[] = adequatelyRandomShuffle(
    Object.keys(CHARACTERISTICS_SCORES),
    CHOOSE_RANDOM_CHARACTERISTICS
  );

  /** reduce produces a single value */
  const sustainabuyScore: number = randomCharacteristics.reduce(
    (score, characteristic) =>
      score + CHARACTERISTICS_SCORES[`${characteristic}` || 0],
    0
  );

  return {
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 3, max: 1000 })) as number,
    imageUrl: faker.image.urlPicsumPhotos(),
    description: faker.commerce.productDescription(),
    characteristics: randomCharacteristics,
    sustainabuyScore,
  };
};

const generateOrder = (
  userId: number,
  products: { id: number }[]
): OrderData => {
  return {
    userId,
    createdAt: faker.date.past(),
    items: Array.from(
      { length: faker.number.int({ min: 1, max: 20 }) },
      (): OrderProductData => {
        // choose a random product
        const randomProduct = faker.helpers.arrayElement(products);
        return {
          productId: randomProduct.id,
          quantity: faker.number.int({ min: 1, max: 10 }),
        };
      }
    ),
  };
};

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

  /** check if db is already seeded */
  const existingUsers = await prisma.user.findMany();
  if (existingUsers.length > 0) {
    console.log("Database is already seeded -- skipping");
    return;
  }

  /** seed Characteristic */
  await prisma.characteristic.createMany({
    data: Object.keys(CHARACTERISTICS_SCORES).map((key) => ({
      name: key,
    })) as CharacteristicData[],
  });

  /** Seed User
   *  generate a bunch of user data, including the mock default user -- Seth Balodi */
  console.log("* Seeding users");
  const users: UserData[] = Array.from({ length: 10 }, () => generateUser());
  users.push({
    name: "Seth Balodi",
    email: "sethbalodi@gmail.com",
    password: "password",
    highHorse: 250,
  });
  /** this creates many users? is this the right syntax? */
  await prisma.user.createMany({ data: users });

  /** Seed Products */
  console.log("* Seeding products");
  const products: ProductData[] = Array.from({ length: 75 }, () =>
    generateProduct()
  );

  // go through each product and create it into the db, ensuring the characteristics are associated
  for (const product of products) {
    const { characteristics, ...productData } = product;
    await prisma.product.create({
      data: {
        ...productData,
        characteristics: {
          connect: characteristics.map((name) => ({ name })),
        },
      },
    });
  }

  //   await prisma.product.createMany({ data: products });

  /** Seed Orders */
  console.log("* Seeding orders");
  const allUsers = await prisma.user.findMany(); // get all the users
  const allProducts = await prisma.product.findMany(); // get all the products

  /** go through all the users, and generate products for each one! */

  for (const user of allUsers) {
    const numOrders = faker.number.int({ min: 1, max: 15 }); // random number of orders
    const orders: OrderData[] = Array.from({ length: numOrders }, () =>
      generateOrder(user.id, allProducts)
    );

    /** for every order we create, we want to create a bunch of order products
     *  which relates the the order to product which it contains (one to many)
     */
    for (const order of orders) {
      const createdOrder = await prisma.order.create({
        data: {
          userId: order.userId,
          createdAt: order.createdAt,
        },
      });

      await prisma.orderProduct.createMany({
        data: order.items.map((item) => ({
          orderId: createdOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    }
  }

  console.log("*** Database seeding complete ***");
};

main()
  .catch((e) => {
    console.log("error!", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
