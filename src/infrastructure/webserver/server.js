import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import config from '@/config'
import BaseController from '@/modules/base/base-controller'

export default async (routesV1, logger) => {
    const app = express()
    const port = config.PORT || 6000
    const baseController = new BaseController()

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
        logger.error(err.stack)
        res.status(err.statusCode || 500)
        res.json(baseController.returnErr(err))
    })

    /**
     * Start listener
     */
    app.listen(port, () => {
        logger.info(`App listening at http://localhost:${port}`)
    })

    return app
}
