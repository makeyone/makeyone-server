import { AbstractLogger, LogLevel, LogMessage } from 'typeorm';

export class TypeormCustomLogger extends AbstractLogger {
  protected writeLog(level: LogLevel, logMessage: LogMessage | LogMessage[]) {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: true,
    });

    for (const message of messages) {
      switch (message.type ?? level) {
        case 'log':
        case 'schema-build':
        case 'migration':
          // console.log(message.message);
          break;

        case 'info':
        case 'query':
          // if (message.prefix) {
          //   console.info(message.prefix, message.message);
          // } else {
          //   console.info(message.message);
          // }
          break;

        case 'warn':
        case 'query-slow':
          if (message.prefix) {
            console.warn(message.prefix, message.message);
          } else {
            console.warn(message.message);
          }
          break;

        case 'error':
        case 'query-error':
          console.error('');
          console.error(`\u001b[1;31m▼▼ ${message.type.toUpperCase().replace('-', ' ')} ▼▼\u001b[0m`);
          console.error(`${(message.prefix, message.message.toString())}\u001b[0m`);
          console.error('');
          console.error('--------------------------------');
          break;
      }
    }
  }
}
