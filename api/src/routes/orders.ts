import express, { Request, Response } from "express";
import prisma from "../utils/prismaClient"; // db connection
const router = express.Router();

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  highHorse: number;
}

interface Order {
  id: number;
  createdAt: Date;
  userId: number;
}

/** get all past orders for all users (should be able to filter by user) */
router.get("/", async (_req: Request, res: Response) => {
  try {
    /** query all orders associated with that user's ID */
    const orders: Order[] = await prisma.order.findMany({
      // also fetch the related items for reach order
      include: {
        user: true,
        items: true,
      },
    });

    res.json(orders);
  } catch (error) {
    console.log("Error fetching orders: ", error);
    res.status(500).json({
      error: "Error fetching orders",
    });
  }
});

/**
 * TODO: create a new order
 */
router.post("/", (req, res) => {
  try {
    /** would add my code here if I had more time to setup with the frontend */
  } catch (error) {
    console.log("Error creating order: ", error);
    res.status(500).json({
      error: "Error creating order",
    });
  }
});

export default router;
