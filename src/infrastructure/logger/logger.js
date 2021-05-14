import { createLogger, format, transports } from 'winston'
const { combine, timestamp, prettyPrint, errors } = format

const logger = createLogger({
    format: combine(errors({ stack: true }), timestamp(), prettyPrint()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'errors.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
    exceptionHandlers: process.env.NODE_ENV === 'production' && [
        new transports.File({ filename: 'exceptions.log' }),
    ],
})

export default logger
