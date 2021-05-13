import { Router } from 'express'
import Joi from 'joi'
import { User } from '@/domains'
import BaseController from '@/modules/base/base-controller'

class AuthController extends BaseController {
    constructor({ authUsecase }) {
        super()
        this.authUsecase = authUsecase
        this.router = Router()
            .post('/login', this.login.bind(this))
            .post('/register', this.register.bind(this))
    }

    async login(req, res) {
        let { username, password } = req.body
        let result
        try {
            await Joi.assert(username, Joi.string().email())
            result = await this.authUsecase.loginWithEmail(username, password)
        } catch (e) {
            result = await this.authUsecase.loginWithUsername(
                username,
                password
            )
        }
        res.json(this.returnOk(result))
    }

    async register(req, res) {
        const user = new User(req.body)
        const valid = user.validate()
        if (valid.error) {
            return res
                .status(500)
                .json(
                    this.returnErrMessage(
                        valid.error,
                        'Error validation',
                        'E_VALIDATION'
                    )
                )
        }
        try {
            const result = await this.authUsecase.register(user)
            return res.json(this.returnOk(result))
        } catch (e) {
            if (e.code === 11000) {
                return res.json(this.returnErrMessage('E_ALREADY_REGISTERED'))
            }
            throw e
        }
    }

    getRouter() {
        return this.router
    }
}

export default AuthController

// const authController = ({ authUsecase }) => {
//     const router = Router()

//     router.get('/login', async (req, res) => {
//         let { username, password } = req.body
//         let result

//         try {
//             await Joi.assert(username, Joi.string().email())
//             result = await authUsecase.loginWithEmail(username, password)
//         } catch (e) {
//             result = await authUsecase.loginWithUsername(username, password)
//         }

//         res.json({
//             data: result,
//         })
//     })

//     router.post('/register', async (req, res) => {
//         const user = new User(req.body)

//         const valid = user.validate()
//         if (valid.error) {
//             return res.status(500).json(valid)
//         }

//         const result = await authUsecase.register(user)
//         if (result.error) {
//             return res.status(500).json(result)
//         }
//         res.json({
//             data: result,
//         })
//     })

//     return router
// }

// export default authController
