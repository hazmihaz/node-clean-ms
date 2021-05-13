import { Router } from 'express'
import BaseController from '@/modules/base/base-controller'
import isAuthMiddleware from '@/modules/auth/middleware/isAuth'

class UserController extends BaseController {
    constructor({ userUsecase }) {
        super()
        this.userUsecase = userUsecase
        this.router = Router()
            .use(isAuthMiddleware)
            .get('/', this.get.bind(this))
            .get('/:id', this.getByID.bind(this))
    }

    async get(req, res) {
        const query = this.paginateQuery(req.query)
        const list = await this.userUsecase.find(query)
        const count = await this.userUsecase.count(query)
        res.json(this.returnOkPaging(list, query.page, query.limit, count))
    }

    async getByID(req, res) {
        const result = await this.userUsecase.get(req.params.id)
        if (!result) res.status(404).json(this.returnNotFound())
        res.json(this.returnOk(result))
    }

    getRouter() {
        return this.router
    }
}

export default UserController
