import fs from 'fs'
import { createTransport } from 'nodemailer'
import handlebars from 'handlebars'
import dayjs from 'dayjs'

import config from '@/config'
import App from '@/constants/app'
import logger from '@/infrastructure/logger/logger'

// TODO should save mail to db

const transporter = createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
    },
})

const template = (handlebars) => {
    const items = {}

    return {
        make(path, content) {
            if (!items[path]) {
                const body = fs.readFileSync(path, 'utf-8')
                const t = handlebars.compile(body)
                items[path] = t
            }
            console.log('ITEMSZ', items)
            return items[path](content)
        },
    }
}

class Mailer {
    constructor() {
        const header = fs.readFileSync(App.email.template.header, 'utf-8')
        const footer = fs.readFileSync(App.email.template.footer, 'utf-8')
        handlebars.registerPartial('header', header)
        handlebars.registerPartial('footer', footer)
        this.template = template(handlebars)
    }

    async sendMail(templatePath, data) {
        try {
            const html = this.template.make(templatePath, data.content)
            const sent = await transporter.sendMail({
                from: App.email.from,
                to: data.to,
                cc: App.email.cc,
                subject: data.subject,
                text: data.subject,
                html,
            })
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
