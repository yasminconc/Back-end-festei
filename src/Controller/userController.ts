import { Request, Response } from 'express'
import { CustomError } from '../Models/CustomError';

export class UserController {
    
    getUser = async (req:Request, res:Response) => {
        try {

            let users = []

            if(req.query){
                
            }

            const { childName, age, parentName, phoneNumber } = req.query

        } catch (error:any) {
            if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
        }
    }
}