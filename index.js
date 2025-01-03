import express from "express";
import path from "path";
import "dotenv/config";
import { mongoConnect } from "./utils/connection.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 3000;

mongoConnect(process.env.DB_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", userRoutes);

app.listen(PORT);
