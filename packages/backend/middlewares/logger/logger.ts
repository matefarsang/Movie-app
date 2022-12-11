const { createLogger, format, transports } = require("winston");

const customFormat = format.combine(
  format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
  format.align(),
  format.printf(
    (info: { level: string; timestamp: string; message: string }) =>
      `[${info.level.toLocaleUpperCase()}]: ${[info.timestamp]}: ${
        info.message
      }`
  ),
  format.colorize({
    all: true,
  })
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: "app.log", level: "info" }),
  ],
});

export default logger;
