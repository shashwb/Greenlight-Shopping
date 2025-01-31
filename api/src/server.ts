import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/products.ts";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

console.log("server.ts has restarted! PORT: ", PORT);

/** middlewares */
app.use(cors());
app.use(express.json());

/** healthcheck */
app.get("/", (_req, res) => {
  res.send("Welcome to the Greenlight API");
});

app.get("/test-cors", (req, res) => {
  console.log("TEST CORS TEST CORS TEST CORS");
  res.send(
    res.json({
      message: "Test CORS",
    })
  );
});

// 'product' controller -> currently mocked
app.use("/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
