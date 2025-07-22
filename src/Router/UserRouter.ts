import express, { Router } from'express'
import { UserBusiness } from'../Business/userBusiness'
import { UserController } from'../Controller/userController'
import { UserData } from'../Data/UserData'
import { TokenManager } from'../Services/TokenManager'
import { IdGenerator } from'../Services/IdGenerator'


const userBusiness: UserBusiness = new UserBusiness(
	new UserData(),
	new TokenManager(),
	new IdGenerator()
)

const userController: UserController = new UserController(userBusiness)

export const userRouter: Router = express.Router()


//Routes

userRouter.post('/createUser', userController.createUser)
userRouter.get('/getUsers', userController.getUser)