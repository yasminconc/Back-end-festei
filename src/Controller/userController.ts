import { Request, Response } from 'express'
import { CustomError } from '../Models/CustomError'
import { UserBusiness } from '../Business/userBusiness'

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ){}

    createUser = async (req:Request, res:Response) => {
        try {
            const { email, childName, parentName, age, birthDate, phoneNumber } = req.body

            const token =  await this.userBusiness.createUser( childName, parentName, age, birthDate, phoneNumber, email)

            res.status(201).send({token: token, message: 'Usuário criado com sucesso!'})
            
        }catch (error:any) {
             if (error instanceof CustomError) {
	 			res.status(error.statusCode).send(error.message)
	 		} else {
	 			res.status(404).send(error.message)
	 		}
         }
    }

    getUser = async (req: Request, res:Response) => {
        try {
            const {word } = req.query 
            
            const response = await this.userBusiness.getUsers(word) 

            res.status(200).send(response)
            
        } catch (error:any) {
            if (error instanceof CustomError) {
	 			res.status(error.statusCode).send(error.message)
	 		} else {
	 			res.status(404).send(error.message)
	 		}
        }
    }

    editUser = async (req: Request, res: Response) => {
        try {
            
            
        } catch (error:any) {
             if (error instanceof CustomError) {
	 			res.status(error.statusCode).send(error.message)
	 		} else {
	 			res.status(404).send(error.message)
	 		}
        }
    }
}