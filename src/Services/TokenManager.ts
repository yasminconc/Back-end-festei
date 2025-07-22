import * as jwt from 'jsonwebtoken'
import { CustomError } from '../Models/CustomError'
import { AuthenticationData } from '../Models/AuthenticationData'

export class TokenManager {
	generate = (payload: jwt.JwtPayload): string => {
		const secret = process.env.TOKEN_SECRET_KEY
		const expiresIn = process.env.TOKEN_EXPIRES as '12h'

		if (!secret || !expiresIn) {
			throw new CustomError(500, 'Missing environment variables for JWT')
		}

		return jwt.sign(payload, secret, {
			expiresIn,
		})
	}

	getTokenData = (token: string): AuthenticationData => {
		const secret = process.env.TOKEN_SECRET_KEY
		if (!secret) {
			throw new CustomError(500, 'Missing TOKEN_SECRET_KEY')
		}

		try {
			return jwt.verify(token, secret) as AuthenticationData
		} catch (error: any) {
			if (error.name === 'TokenExpiredError') {
				throw new CustomError(401, 'Expired token, login again')
			} else if (error.name === 'JsonWebTokenError') {
				throw new CustomError(401, 'Invalid token, login again')
			} else {
				throw new CustomError(404, 'Unknown token validation error')
			}
		}
	}
}
