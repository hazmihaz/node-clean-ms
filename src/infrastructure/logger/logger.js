import winston from 'winston'

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.prettyPrint(),
        }),
        new winston.transports.File({ filename: 'errors.log', level: 'error' }),
        new winston.transports.File({ filename: 'warning.log', level: 'warn' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ],
    exceptionHandlers: process.env.NODE_ENV === 'production' && [
        new winston.transports.File({ filename: 'exceptions.log' }),
    ],
})

export default logger
