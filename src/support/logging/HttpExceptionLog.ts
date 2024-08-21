import * as winston from 'winston';
import * as WinstonDaily from 'winston-daily-rotate-file';

export default function httpExceptionLog(status: number, log: object) {
  const logDir = __dirname + '/../../logs';
  const { combine, timestamp, printf, splat } = winston.format;

  const logFormat = printf((info) => {
    const timestamp = info.timestamp;
    const infoStatus = info.message.status;
    const infoRequeest = info.message.request;
    const infoError = info.message.error;
    const logJson = {
      status: infoStatus,
      request: infoRequeest,
      error: infoError,
    };

    return `[${timestamp}] ${JSON.stringify(logJson)}`;
  });

  const createErrorLog = winston.createLogger({
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), splat(), logFormat),
    transports: [
      new WinstonDaily({
        datePattern: 'YYYY-MM-DD',
        dirname: `${logDir}/error/%DATE%`,
        filename: `${status}.error.log`,
      }),
    ],
  });

  createErrorLog.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.errors({ stack: true }),
        winston.format.ms(),
        winston.format.colorize({ all: true }),
      ),
    }),
  );

  createErrorLog.error(log);
}
