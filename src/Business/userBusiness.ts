import { UserData } from "../Data/UserData";
import { CustomError } from "../Models/CustomError";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";
// import {User} from '@prisma/client'

export class UserBusiness {

    constructor(
        private userData: UserData,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator

    ){}

    createUser = async (childName:string, parentName:string, age:number, birthDate:string, phoneNumber:string, email?:string) => {
        try {
            if(!childName){
                throw new CustomError(400, 'Insira o nome da criança')
            }

            if(!parentName){
                throw new CustomError(400, 'Insira o nome do responsável')
            }

            if(!age){
                throw new CustomError(400, 'Insira a idade da criança')
            }

            if(!birthDate){
                throw new CustomError(400, 'Insira a data de nascimento da criança')
            }

            if(!phoneNumber){
                throw new CustomError(400, 'Insira um número de telefone')
            }

            const id: string = this.idGenerator.generate()
            const token = this.tokenManager.generate({id: id})

        
            await this.userData.createUser(
                id,
                childName,
                parentName,
                age,
                birthDate,
                phoneNumber,
                email
            )

            return token

            } catch (error:any) {
                if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message)
			}
        }    
    }


    getUsers = async (word:any) => {
        try {
            const res = await this.userData.getUsers(word)

            return res
            
        } catch (error:any) {
            if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			} 
        }
    }

    editUser = async (token: string, childName:string, parentName:string, age:number, birthDate:string, phoneNumber:string, email?:string) => {
        try {
            if(!childName){
                throw new CustomError(400, 'Insira o nome da criança')
            }

            if(!parentName){
                throw new CustomError(400, 'Insira o nome do responsável')
            }

            if(!age){
                throw new CustomError(400, 'Insira a idade da criança')
            }

            if(!birthDate){
                throw new CustomError(400, 'Insira a data de nascimento da criança')
            }

            if(!phoneNumber){
                throw new CustomError(400, 'Insira um número de telefone')
            }


            const { id } = this.tokenManager.getTokenData(token)

            await this.userData.editeUser(
                id,
                childName,
                parentName,
                age,
                birthDate,
                phoneNumber,
                email
            )
            
        } catch (error:any) {
            if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message);
			} else {
				throw new Error(error.message);
			} 
        }
    }
}