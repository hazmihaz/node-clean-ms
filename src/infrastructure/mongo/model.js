import mongoose from 'mongoose'

export default (schema) => {
    return mongoose.model(
        schema.name,
        new mongoose.Schema(schema.schema, schema.options)
    )
}
