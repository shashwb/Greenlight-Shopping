import express, { Request, Response } from "express";
import prisma from "../utils/prismaClient"; // db connection
const router = express.Router();

interface ProductsResponseQuery {
  id: number;
  name: string;
  characteristics: { name: string }[];
  price: number;
  imageUrl: string;
  description: string;
  sustainabuyScore: number;
}

interface Product {
  id: number;
  name: string;
  characteristics: string[];
  price: number;
  imageUrl: string;
  description: string;
  sustainabuyScore: number;
}

console.log("(Products) router has restarted!");

/**
 * GET all products w/ optional filters
 */
router.get("/", async (req, res) => {
  try {
    const { characteristic, sort, page = 1, limit = 9 } = req.query;

    // get all products with their associated characteristic names
    const products: ProductsResponseQuery[] = await prisma.product.findMany({
      include: {
        characteristics: {
          select: {
            name: true,
          },
        },
      },
      take: Number(limit), // number of items per page
      skip: (Number(page) - 1) * Number(limit), // offset
      orderBy: {
        id: "asc",
      },
    });

    // total products count
    const totalProducts = await prisma.product.count();

    // Transform the products to return only characteristic names
    const transformedProducts: Product[] = products.map((product) => ({
      ...product,
      characteristics: product.characteristics.map((c: any) => c.name),
    }));

    res.status(200).json({
      products: transformedProducts,
      totalPages: Math.ceil(totalProducts / Number(limit)),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

/**
 * GET product/:id from a specific id
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || parseInt(id as string) < 0)
      throw new Error("Please submit a valid product id");
    const product: any = await prisma.product.findUnique({
      where: { id: parseInt(id as string) },
    });
    if (!product) res.status(404).send(`Product ${id} not found`);
    res.status(200).send(product);
  } catch (error) {
    console.log("/:id error", error);
    res.status(500).send("Error getting product based on id");
  }
});

export default router;
