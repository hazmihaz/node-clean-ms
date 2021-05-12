import { User } from '@/domains'

const userUsecase = ({ userRepository }) => {
    return {
        async find(query) {
            const findRes = await userRepository.find(query)
            if (findRes.error) {
                return findRes
            }
            const totalRes = await userRepository.count()
            if (totalRes.error) {
                return totalRes
            }
            return {
                data: {
                    list: findRes.data.map((el) => new User(el)),
                    paging: {
                        total: totalRes.data,
                    },
                },
            }
        },

        async get(id) {
            const res = await userRepository.get(id)
            if (res.error) {
                return res
            }
            if (!res.data) {
                return {
                    error: true,
                    statusCode: 404,
                }
            }
            return {
                data: new User(res.data),
            }
        },
    }
}

export default userUsecase
