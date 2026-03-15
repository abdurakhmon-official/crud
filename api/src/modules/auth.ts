import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

type PayloadShape = {
    id: string,
    username: string
}

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSaltSync()
    return bcrypt.hash(password, salt)
}

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}

export const createJWT = ({ id, username }: PayloadShape) => {
    const token = jwt.sign({id, username}, process.env.JWT_SECRET)
    return token
}