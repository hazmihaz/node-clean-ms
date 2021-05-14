const baseEmailTemplate = __dirname + '/../infrastructure/mailer/template/'

const app = {
    email: {
        from: 'NODECLEAN <nodeclean@mailinator.com>',
        template: {
            header: baseEmailTemplate + 'header.hbs',
            footer: baseEmailTemplate + 'footer.hbs',
            general: baseEmailTemplate + 'general.hbs',
        },
    },
    events: {
        USER_REGISTERED: 'USER_REGISTERED',
    },
}

export default app
