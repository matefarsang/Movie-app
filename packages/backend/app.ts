require("express-async-errors");
import express from "express";
import notFoundHandler from "./middlewares/not-found-handler";
import errorHandler from "./middlewares/error-handler";
import cors from "cors";
import movieRouter from "./routes/movie-router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", movieRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
