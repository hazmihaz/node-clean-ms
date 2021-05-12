import { Router } from 'express'
import Joi from 'joi'
import { User } from '@/domains'

const authController = ({ authUsecase }) => {
    const router = Router()

    router.get('/login', async (req, res) => {
        let { username, password } = req.body
        let result

        try {
            await Joi.assert(username, Joi.string().email())
            result = await authUsecase.loginWithEmail(username, password)
        } catch (e) {
            result = await authUsecase.loginWithUsername(username, password)
        }

        res.json({
            data: result,
        })
    })

    router.post('/register', async (req, res) => {
        const user = new User(req.body)

        const valid = user.validate()
        if (valid.error) {
            return res.status(500).json(valid)
        }

        const result = await authUsecase.register(user)
        if (result.error) {
            return res.status(500).json(result)
        }
        res.json({
            data: result,
        })
    })

    return router
}

export default authController
