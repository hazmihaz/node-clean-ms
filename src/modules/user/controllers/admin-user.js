import { Router } from 'express'

const adminUserController = ({ userUsecase }) => {
    const router = Router()

    router.get('/', async (req, res) => {
        res.send(await userUsecase.get())
    })

    return router
}

export default adminUserController
