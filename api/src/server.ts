import express from "express";
import dotenv from "dotenv";
import cors from "cors";

/** routers */
import productsRouter from "./routes/products.ts";
import usersRouter from "./routes/users.ts";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

console.log("server.ts has restarted! PORT: ", PORT);

/** middlewares */
app.use(cors());
app.use(express.json());

/** healthcheck */
app.get("/", (_req, res) => {
  res.status(200).send("Welcome to the Greenlight API");
});

// 'product' controller
app.use("/products", productsRouter);

// 'user' controller
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
