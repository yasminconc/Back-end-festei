import { prisma } from "../../baseDataBase"

export class UserData {

	createUser = async (childName:string, parentName:string, age:number, birthDate:string, phoneNumber:string, email?:string) => {
		try {
			await prisma.user.create({
				data: {
					email,
					childName,
					parentName,
					age,
					birthDate: new Date(birthDate),
					phoneNumber	
				}
			})

		} catch (error:any) {
			throw new Error(error.message)
		}
	}
    
// getUsers = async (email:string, childName:string, parentName:string, age:number, birthDate:date, phoneNumber:string) => {
// 	try {
// 		await prisma.user.findMany({
// 			where: {
// 				email,
// 				childName,
// 				parentName,
// 				age,
// 				birthDate,
// 				phoneNumber
// 			}
// 		})
		
// 	} catch (error:any) {
// 		throw new Error(error.message)
// 	}
// }

}