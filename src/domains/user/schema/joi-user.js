import Joi from 'joi'

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(24).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(255).required(),
}).unknown()

export default schema
