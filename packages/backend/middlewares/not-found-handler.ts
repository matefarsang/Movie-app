import type { RequestHandler } from "express";
import logger from "./logger/logger";

const notFoundHandler: RequestHandler = (_req, res, _next) => {
  logger.error(
    `${400} - ${"Not found"} - ${_req.originalUrl} - ${_req.method} - ${
      _req.ip
    }`
  );
  return res.status(404).send({ error: "Not found" });
};

export default notFoundHandler;
