import 'module-alias/register'
import { Router } from 'express'

import '@/config'
import logger from '@/infrastructure/logger/logger'
import DB from '@/infrastructure/mongo/connection'
import Model from '@/infrastructure/mongo/model'
import Server from '@/infrastructure/webserver/server'

import userSchema from '@/domains/user/schema/mongo-user'

import UserRepository from '@/modules/user/repository/user'
import _userUsecase from '@/modules/user/usecases/user'
import _userController from '@/modules/user/controllers/user'
import _adminUserController from '@/modules/user/controllers/admin-user'

import _authUsecase from '@/modules/auth/usecases/auth'
import _authController from '@/modules/auth/controllers/auth'

async function start() {
    DB(logger)

    const userModel = Model(userSchema)
    const userRepository = new UserRepository(userModel)
    const userUsecase = _userUsecase({ userRepository, logger })
    const userController = _userController({ userUsecase, logger })
    const adminUserController = _adminUserController({ userUsecase, logger })

    const authUsecase = _authUsecase({ userRepository, logger })
    const authController = _authController({ authUsecase, logger })

    const v1 = Router()
    v1.use('/auth', authController)
    v1.use('/user', userController)
    v1.use('/admin/user', adminUserController)

    await Server(v1, logger)
}

start()