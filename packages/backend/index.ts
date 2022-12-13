import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";
import logger from "./middlewares/logger/logger";

const port = process.env.PORT || 3001;
const mongoDbUrl = process.env.MONGO_URL || "mongodb://db:27017";

mongoose
  .connect(`${mongoDbUrl}`, {})
  .then(() => logger.info("MongoDB Connected"))
  .catch((err: unknown) => logger.error(err));

const server = async (): Promise<void> => {
  app.listen(port, () => {
    logger.info(`app listening at http://localhost:${port}`);
  });
};

server().catch(console.error);
