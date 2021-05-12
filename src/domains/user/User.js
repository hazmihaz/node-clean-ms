import validator from '@/domains/validator'
import validationSchema from './schema/joi-user'

class User {
    constructor(obj) {
        this.id = obj.id || obj._id
        this.username = obj.username
        this.email = obj.email
        this.password = obj.password
        this.createdAt = obj.createdAt
        this.updatedAt = obj.updatedAt
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }

    validate() {
        return validator(validationSchema)(this)
    }
}

export default User
