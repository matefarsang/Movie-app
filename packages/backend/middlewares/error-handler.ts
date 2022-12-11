import type { ErrorRequestHandler } from "express";
import logger from "./logger/logger";

const errorHandler: ErrorRequestHandler = (_err, _req, res, _next) => {
  logger.error(
    `${_err.status || 500} - ${res.statusMessage} - ${_err.message} - ${
      _req.originalUrl
    } - ${_req.method} - ${_req.ip}`
  );
  return res.status(500).json({ error: "internal server error ! ! !" });
};

export default errorHandler;
