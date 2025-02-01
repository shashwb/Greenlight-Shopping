import express from "express";
import prisma from "../utils/prismaClient"; // db connection
const router = express.Router();
import __mock__data from "../db/db.ts";

// GET all products (w/ optional filters)
router.get("/", async (req, res) => {
  console.log("products => router!!!!!");
  try {
    const { characteristic, sort, page = 1, limit = 10 } = req.query;

    console.log(
      "characteristic: ",
      characteristic,
      "sort",
      sort,
      "page",
      page,
      "limit",
      limit
    );

    /** mock reponse data for now  */
    const response = {
      data: __mock__data,
    };

    /** get all products? */
    const products = await prisma.product.findMany();
    console.log("products: ", products);

    /** we should use a db query once we're ready */
    // const response = await axios.get(`${jsonServerUrl}/products`);
    res.json(products);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts test DOES THIS SHOW UP?");
  }
});

export default router;
