import errorCodes from '@/constants/error-codes'
import BaseRepository from '@/modules/base/base-repository'

class UserRepository extends BaseRepository {
    constructor(userModel) {
        super(userModel)
    }

    async create(user) {
        try {
            const item = await userModel.create(user)
            if (item) {
                return {
                    error: false,
                    data: item,
                }
            }
        } catch (e) {
            if (e?.code === 11000) {
                return {
                    error: true,
                    statusCode: 500,
                    message: errorCodes.E_USER_ALREADY_EXISTS,
                }
            }
            return {
                error: true,
                statusCode: 500,
                message: e || 'Error creating new item.',
            }
        }
    }
}

export default UserRepository
