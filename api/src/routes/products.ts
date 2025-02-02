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
    const { filters, q, page = 1, limit = 9 } = req.query;

    let parsedFilters: string[] = [];
    if (filters) {
      if (Array.isArray(filters)) {
        parsedFilters = filters.map((filter) => String(filter));
      } else {
        parsedFilters = [String(filters)];
      }
    }

    const products: any = await prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                name: {
                  contains: String(q),
                },
              },
              {
                characteristics: {
                  some: {
                    name: {
                      contains: String(q),
                    },
                  },
                },
              },
            ],
          },
          {
            characteristics: {
              some: {
                name: {
                  in: parsedFilters, // Array of characteristic names
                },
              },
            },
          },
        ],
      },
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
    // const totalProducts = await prisma.product.count();
    const totalProducts = products.length;

    // Transform the products to return only characteristic names
    const transformedProducts: Product[] = products.map((product: Product) => ({
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

/** GET SEARCH */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      throw new Error("Please submit a search query");
    }
    const suggestions = await prisma.product.findMany({
      where: { name: { contains: String(q) } },
      select: { name: true }, // Only return product names for autocomplete
      take: 5, // Limit the number of suggestions
    });

    res.json(suggestions.map((product: any) => product.name));
  } catch (error) {
    console.log("Error searching products:", error);
    res.status(500).send("Server Error: searching products");
  }
});

/**
 * GET product/:id from a specific id
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure the id is a positive integer
    const parsedId = parseInt(id as string, 10);

    if (isNaN(parsedId) || parsedId < 0) {
      throw new Error("Please submit a valid product id");
    }
    const product = await prisma.product.findUnique({
      where: { id: parsedId },
    });
    if (!product) res.status(404).send(`Product ${id} not found`);
    res.status(200).send(product);
  } catch (error) {
    console.log("/:id error", error);
    res.status(500).send("Error getting product based on id");
  }
});

export default router;
