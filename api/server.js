import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

/** middlewares */
app.use(cors());
app.use(express.json());

/** healthcheck */
app.get("/", (_req, res) => {
  res.send("Welcome to the Greenlight API");
});

// 'product' controller -> currently mocked
app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
