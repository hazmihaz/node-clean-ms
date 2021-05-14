import { verifyAccessToken } from '../security'
// import logger from '@/infrastructure/logger'

export default async (req, res, next) => {
    const token = req.headers['authorization']

    if (token == null) return res.sendStatus(401)

    await verifyAccessToken(token)
        .then((user) => {
            req.user = user
            next()
        })
        .catch((err) => {
            res.sendStatus(401)
        })
}
