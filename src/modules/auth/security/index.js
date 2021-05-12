import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '@/config'

export const generateAccessToken = (id) => {
    return jwt.sign({ id }, config.SECRET, { expiresIn: '1d' })
}

export const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.SECRET, (err, user) => {
            if (err) reject(err)
            resolve(user)
        })
    })
}

export const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

export const verifyPassword = async (password, hash) => {
    return bcrypt.compare(password, hash)
}
