import errorCodes from '@/constants/error-codes'
import BaseRepository from '@/modules/base/base-repository'

class UserRepository extends BaseRepository {
    constructor(userModel) {
        super(userModel)
    }

    async create(user) {
        try {
            const item = await this.model.create(user)
            if (item) {
                return {
                    data: item,
                }
            }
        } catch (e) {
            return {
                error: e || 'Error creating new item.',
            }
        }
    }
}

export default UserRepository
