import express from "express";
import productsRouter from "./routes/products.js";
import cors from "cors";

// put PORT into environment variable
const PORT = 5000;
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
