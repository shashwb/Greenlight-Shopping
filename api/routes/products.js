import express from "express";
import axios from "axios";

const router = express.Router();
const jsonServerUrl = "http://localhost:5000"; // Adjust if necessary
import __mock__data from "../db/db.js";

// Route to get all posts from JSON Server
router.get("/", async (req, res) => {
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
    res.status(500).send("Error fetching posts test");
  }
});

export default router;
