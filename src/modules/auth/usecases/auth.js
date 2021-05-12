import { generateAccessToken, generateHash, verifyPassword } from '../security'
import { User } from '@/domains'

const authUsecase = ({ userRepository, logger }) => {
    return {
        async loginWithUsername(username, password) {
            const { list, error } = await userRepository.find({ username })
            if (error || !list.length) {
                return {
                    error: true,
                    message: 'Username or password is incorrect',
                }
            }

            const user = new User(list[0])
            const validPassword = await verifyPassword(password, user.password)
            if (!validPassword) {
                return {
                    error: true,
                    message: 'Username or password is incorrect',
                }
            }

            return generateAccessToken(user.id)
        },

        async loginWithEmail(email, password) {
            const { list, error } = await userRepository.find({ email })
            if (error || !list.length) {
                return {
                    error: true,
                    message: 'Email or password is incorrect',
                }
            }

            const user = new User(list[0])
            const validPassword = await verifyPassword(password, user.password)
            if (!validPassword) {
                return {
                    error: true,
                    message: 'Email or password is incorrect',
                }
            }

            return generateAccessToken(user.id)
        },

        async register(user) {
            const newUser = new User({
                ...user,
                password: await generateHash(user.password),
            })

            const result = await userRepository.create(newUser)
            if (result.error) {
                return result
            }

            return new User(result.data)
        },
    }
}

export default authUsecase
