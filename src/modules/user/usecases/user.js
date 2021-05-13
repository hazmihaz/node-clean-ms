import { User } from '@/domains'

const userUsecase = ({ userRepository }) => {
    return {
        async find(query) {
            const res = await userRepository.find(query)
            if (res.error) throw res.error
            return res.data.map((el) => new User(el))
        },

        async count(query) {
            const res = await userRepository.count(query)
            if (res.error) throw res.error
            return res.data
        },

        async get(id) {
            const res = await userRepository.get(id)
            if (res.error) throw res.error
            return res.data && new User(res.data)
        },
    }
}

export default userUsecase
