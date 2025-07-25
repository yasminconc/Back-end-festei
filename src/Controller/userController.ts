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

            const token = await this.userBusiness.createUser( childName, parentName, age, birthDate, phoneNumber, email )

            res.status(201).send({token: token, message: 'Usuário criado com sucesso!'})
            
        }catch (error:any) {
             if (error instanceof CustomError) {
	 			res.status(error.statusCode).send(error.message)
	 		} else {
	 			res.status(404).send(error.message)
	 		}
         }
    }


    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userBusiness.getAllUsers()

            res.status(200).send(users)
            
        } catch (error:any) {
            if (error instanceof CustomError) {
	 			res.status(error.statusCode).send(error.message)
	 	    } else {
	 			res.status(404).send(error.message)
	 	    }
        }
    }

    searchUsers = async (req: Request, res:Response) => {
        try {
            const { word } = req.query 
            
            const response = await this.userBusiness.searchUsers(word) 

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
            const { email, childName, parentName, age, birthDate, phoneNumber } = req.body 

            const { id } = req.params

            const result = await this.userBusiness.editUser( id, childName, parentName, age, birthDate, phoneNumber, email ) 

            res.status(200).send({result, message: 'Usuário editado com sucesso!'} )
            
        } catch (error:any) {
            if (error instanceof CustomError) {
	 			res.status(error.statusCode).send(error.message)
	 		} else {
	 			res.status(404).send(error.message)
	 		}
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            await this.userBusiness.deleteUser(id)

            res.status(204).send({message: 'Usuário deletado com sucesso'})
            
        } catch (error:any) {
            if (error instanceof CustomError) {
	 			res.status(error.statusCode).send(error.message)
	 		} else {
	 			res.status(404).send(error.message)
	 		}
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params

            const result = await this.userBusiness.getUserById(id)

            res.status(200).send(result)

        } catch (error:any) {
            if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message)
			} else {
				throw new Error(error.message)
			} 
    }   }
}
