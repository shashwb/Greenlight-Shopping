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

console.log(["(Users) router has restarted!"]);

/** GET /users - get all users (but right now we're only mocking Seth Balodi) */
router.get("/", async (req: Request, res: Response) => {
  try {
    /** the email field is @unique */
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: "sethbalodi@gmail",
      },
    });
    if (!user) throw new Error("User not found");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error fetching users: ", error);
    res.status(500).send("/Users : Error fetching users");
  }
});

export default router;
