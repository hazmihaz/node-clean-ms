import express from 'express'
import cors from 'cors'
import config from '@/config'

export default async (routesV1, logger) => {
    const app = express()
    const port = config.PORT || 6000

    /**
     * Enable cors on all actions
     */
    app.use(cors())

    /**
     * Enable body parser
     */
    app.use(express.json())

    /**
     * Application routes
     */
    app.use('/api/v1', routesV1)

    /**
     * Catch 404 and forward to error handle.
     */
    app.use((req, res, next) => {
        const err = new Error('Not Found')
        err['status'] = 404
        next(err)
    })

    /**
     * Global error catcher.
     */
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message,
            },
        })
    })

    /**
     * Start listener
     */
    app.listen(port, () => {
        logger.info(`App listening at http://localhost:${port}`)
    })

    return app
}
