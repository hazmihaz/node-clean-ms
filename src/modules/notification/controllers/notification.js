import { Router } from 'express'
import App from '@/constants/app'
import BaseController from '@/modules/base/base-controller'
import EventBus from '@/infrastructure/eventbus/eventbus'
import Mailer from '@/infrastructure/mailer/mailer'

class NotificationController extends BaseController {
    constructor() {
        super()
        this.mailer = new Mailer()
        this.router = new Router()
        this.router.get('/', this.get)

        EventBus.on(App.events.USER_REGISTERED, this.notifyUserRegister)
    }

    notifyUserRegister = (data) => {
        this.mailer.sendMail(App.email.template.general, {
            to: `${data.username} <${data.email}>`,
            subject: `Welcome, ${data.username}!`,
            content: {
                message: `You are now registered. Your username: ${data.username}`,
            },
        })
        // send firebase message
    }

    get = (req, res) => {
        res.json(this.returnOk())
    }

    getRouter = () => {
        return this.router
    }
}

export default NotificationController
