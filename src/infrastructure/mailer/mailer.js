import fs from 'fs'
import { createTransport } from 'nodemailer'
import handlebars from 'handlebars'

import config from '@/config'
import App from '@/constants/app'
import logger from '@/infrastructure/logger/logger'

// TODO should save mail to db

const IS_PROD = config.env.NODE_ENV === 'production'

const transporter = createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
    },
})

const header = fs.readFileSync(App.email.template.header, 'utf-8')
const footer = fs.readFileSync(App.email.template.footer, 'utf-8')
handlebars.registerPartial('header', header)
handlebars.registerPartial('footer', footer)

const templateCache = {}
const makeTemplate = (path, content) => {
    let template = templateCache[path]
    if (!template) {
        const body = fs.readFileSync(path, 'utf-8')
        template = templateCache[path] = handlebars.compile(body)
    }
    return template(content)
}

class Mailer {
    async sendMail(templatePath, data) {
        try {
            const html = makeTemplate(templatePath, data.content)
            const sent = await transporter.sendMail({
                from: App.email.from,
                to: data.to,
                cc: IS_PROD && App.email.cc,
                subject: data.subject,
                text: data.subject,
                html,
            })
            !IS_PROD &&
                logger.info({
                    message: 'Mail sent',
                    data: sent,
                })
        } catch (e) {
            logger.error(e)
            return e
        }
    }
}

export default Mailer
