import mongoose from 'mongoose'

export default (logger) => {
    mongoose.connect('mongodb://localhost:27017/node-clean-ms', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })

    mongoose.pluralize(null)

    const db = mongoose.connection
    db.on('error', (e) => logger.error('Mongodb connection error:', e))
    db.once('open', () => logger.info('Mongodb connected'))

    return db
}
