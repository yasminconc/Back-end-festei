import { UserData } from "../Data/UserData";
import { CustomError } from "../Models/CustomError";


export class UserBusiness {

    constructor(
        private userData: UserData
    ){}

    createUser = async (childName:string, parentName:string, age:number, birthDate:string, phoneNumber:string, email?:string) => {
        
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

        
        await this.userData.createUser(
            childName,
            parentName,
            age,
            birthDate,
            phoneNumber,
            email
        )

        return {token: '1234'}
    }
}