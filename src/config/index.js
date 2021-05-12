import dotenv from 'dotenv'

dotenv.config()
const env = process.env
const config = {
    env,
    PORT: env.PORT || 6000,
    SECRET: env.SECRET || '',
}

export default config
