import { prisma } from "../../baseDataBase"

export class UserData {
    
getUsers = async (email:string, childName:string, parentName:string, age:number, birthDate:date, phoneNumber:string) => {
	try {
		await prisma.user.findMany({
			where: {
				email,
				childName,
				parentName,
				age,
				birthDate,
				phoneNumber
			}
		})
		
	} catch (error:any) {
		throw new Error(error.message)
	}
}

}