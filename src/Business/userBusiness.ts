import { UserData } from '../Data/UserData'
import { CustomError } from '../Models/CustomError'
import { IdGenerator } from '../Services/IdGenerator'
import { TokenManager } from '../Services/TokenManager'

export class UserBusiness {

    constructor(
        private userData: UserData,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ){}

    createUser = async ( childName:string, parentName:string, age:number, birthDate:string, phoneNumber:string, email?:string ) => {
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
            const token = this.tokenManager.generate({ id: id })

        
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
				throw new CustomError(error.statusCode, error.message)
			} else {
				throw new Error(error.message)
			}
        }    
    }


    getAllUsers = async () => {
        try {
            const users = await this.userData.getAllUsers()

            return users 
 
            
        } catch (error:any) {
            if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message)
			} else {
				throw new Error(error.message)
			}
        }
    }


    searchUsers = async (word:any) => {
        try {
            const res = await this.userData.searchUsers(word)

            return res
            
        } catch (error:any) {
            if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message)
			} else {
				throw new Error(error.message)
			} 
        }
    }

    editUser = async ( id: string, childName:string, parentName:string, age:number, birthDate:string, phoneNumber:string, email?:string ) => {
        try {
            if(!id){
                throw new CustomError(400, 'Insira um id')
            }

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


            const result = await this.userData.editUser(
                id,
                childName,
                parentName,
                age,
                birthDate,
                phoneNumber,
                email
            )

            if(!result){
                throw new CustomError(404, 'Usuário não encontrado')
            }

            return result

            
        } catch (error:any) {
            if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message)
			} else {
				throw new Error(error.message)
			} 
        }
    }


    deleteUser = async (id: string) => {
        try {
            if(!id){
                throw new CustomError(400, 'Insira um id')
            }

            const user = await this.userData.getUserById(id)

            if(!user){
                throw new CustomError(400, 'id inválido')
            }

            await this.userData.deleteUser(id)
            
        } catch (error:any) {
            if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message)
			} else {
				throw new Error(error.message)
			} 
        }
    }


    getUserById = async (id: string) => {
        try {
            if(!id){
                throw new CustomError(400, 'Insira um id')
            }

            const response = await this.userData.getUserById(id)

            return response
            
        } catch (error:any) {
            if (error instanceof CustomError) {
				throw new CustomError(error.statusCode, error.message)
			} else {
				throw new Error(error.message)
			} 
        }
    }
}