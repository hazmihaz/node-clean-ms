import { Router } from 'express'
import isAuthMiddleware from '@/modules/auth/middleware/isAuth'

const userController = ({ userUsecase }) => {
    const router = Router()

    router.use(isAuthMiddleware)

    router.get('/', async (req, res) => {
        const query = req.query
        res.json(await userUsecase.find(query))
    })

    router.get('/:id', async (req, res) => {
        res.json(await userUsecase.get(req.params.id))
    })

    return router
}

export default userController
