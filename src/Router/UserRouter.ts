import express, { Router } from "express";
import { UserBusiness } from "../Business/userBusiness"
import { UserController } from "../Controller/userController";
import { UserData } from "../Data/UserData"


const userBusiness: UserBusiness = new UserBusiness(
	new UserData()
)

const userController: UserController = new UserController(userBusiness)

export const userRouter: Router = express.Router()


//Routes

userRouter.post('/createUser', userController.createUser)