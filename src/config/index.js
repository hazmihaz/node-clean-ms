import dotenv from 'dotenv'

dotenv.config()
const env = process.env
const config = {
    env,

    PORT: env.PORT || 6000,
    SECRET: env.SECRET || '',

    SMTP_HOST: env.SMTP_HOST,
    SMTP_PORT: env.SMTP_PORT,
    SMTP_USER: env.SMTP_USER,
    SMTP_PASS: env.SMTP_PASS,
}

export default config
