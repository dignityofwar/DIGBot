import { createLogger, transports, format, Logger } from 'winston';

/**
 * A default instance of the logger
 */
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({timestamp, label, level, message}) => `${timestamp} | ${label} | ${level} | ${message}`),
    ),
    transports: [
        new transports.Console(),
    ],
});

export default logger;

/**
 * Creates a logger for a module
 *
 * @param {string} label The name of the module
 */
export function childLogger(label: string): Logger {
    return logger.child({label});
}