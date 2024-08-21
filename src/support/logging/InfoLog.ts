import * as winston from 'winston';

export default function infoLog(messageText: string, labelText?: string) {
  const { combine, timestamp, printf } = winston.format;

  const logFormat = printf(() => `${messageText}`);

  const logger = winston.createLogger({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  });

  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.ms(),
        winston.format.colorize({ all: true }),
      ),
    }),
  );

  logger.info(`${labelText ? `[${labelText}] ` : ''}${messageText}`);
}
