/* eslint-disable no-unused-vars */
import { createLogger, transports, format } from 'winston';

const options = {
  file: {
    level: 'info',
    filename: `${__dirname}/../../logs/blog.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (entry) => `${entry.timestamp} ${entry.level}: ${entry.message}`,
    ),
  ),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: `${__dirname}/../../logs/exceptions-rejections.log`,
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${__dirname}/../../logs/exceptions-rejections.log`,
    }),
    new transports.Console({
      format: format.simple(),
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

export default logger;

// import { createLogger, transports, format } from 'winston';

// const logger = createLogger({
//   format: format.combine(
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     format.printf(
//       (entry) => `${entry.timestamp} ${entry.level}: ${entry.message}`,
//     ),
//   ),
//   transports: [
//     new transports.File({
//       filename: `${__dirname}/../../logs/blog.log`,
//     }),
//     new transports.File({
//       filename: `${__dirname}/../../logs/blog-errors.log`,
//       level: 'error',
//     }),
//     new transports.Console({
//       format: format.simple(),
//     }),
//   ],
//   rejectionHandlers: [
//     new transports.File({
//       filename: `${__dirname}/../../logs/exceptions-rejections.log`,
//     }),
//   ],
//   exceptionHandlers: [
//     new transports.File({
//       filename: `${__dirname}/../../logs/exceptions-rejections.log`,
//     }),
//     new transports.Console({
//       format: format.simple(),
//     }),
//   ],
// });
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(
//     new transports.Console({
//       format: format.simple(),
//     }),
//   );
// }

// export default logger;
