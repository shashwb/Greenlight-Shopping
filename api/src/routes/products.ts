import express from "express";

const router = express.Router();
import __mock__data from "../db/db.ts";

console.log("inside the productsRouter!, __mock__data: ", __mock__data);

// Route to get all posts from JSON Server
router.get("/", async (req, res) => {
  console.log("products => router!!!!!");
  try {
    /** mock reponse data for now  */
    const response = {
      data: __mock__data,
    };
    /** we should use a db query once we're ready */
    // const response = await axios.get(`${jsonServerUrl}/products`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts test DOES THIS SHOW UP?");
  }
});

export default router;
