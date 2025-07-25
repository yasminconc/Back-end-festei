import { prisma } from '../../baseDataBase'

export class UserData {
	createUser = async ( id: string, childName: string, parentName: string, age: number, birthDate: string, phoneNumber: string, email?: string ) => {
		try {
			await prisma.user.create({
				data: {
					id,
					email,
					childName,
					parentName,
					age,
					birthDate: new Date(birthDate),
					phoneNumber
				}
			})

		} catch (error: any) {
			throw new Error(error.message)
		}
	}

	getAllUsers = async () => {
		try {
			const users = await prisma.user.findMany()

			return users
			
		} catch (error:any) {
			throw new Error(error.message)
		}
	}

	searchUsers = async ( word: any ) => {
		try {
			const result = await prisma.user.findMany({
				where: {
					OR: [
						{ childName: { contains: word, mode: 'insensitive' } },
						{ parentName: { contains: word, mode: 'insensitive' } },
						{ phoneNumber: { contains: word, mode: 'insensitive' } },
						{ email: { contains: word, mode: 'insensitive' } },
						...(isNaN(Number(word)) ? [] : [{ age: { equals: Number(word) } }]),
						...(isNaN(Date.parse(word)) ? [] : [{ birthDate: { equals: new Date(word) } }])
					]   
				}
			})

			return result

		} catch (error: any) {
			throw new Error(error.message)
		}
	}

	editUser = async ( id: string, childName: string, parentName: string, age: number, birthDate: string, phoneNumber: string, email?: string ) => {
		try {
			const result = await prisma.user.update({
				where: { id: id },
				data: {
					childName,
					parentName,
					age,
					birthDate: new Date(birthDate),
					phoneNumber,
					email
				}

			}) 

			return result

		} catch (error:any) {
			throw new Error(error.message)
		}
	}

	deleteUser = async ( id: string ) => {
		try {
			await prisma.user.delete({
				where:{ id: id }
			})
			
		} catch (error:any) {
			throw new Error(error.message)
		}
	}

	getUserById = async ( id: string ) => {
		try {
			const result = await prisma.user.findUnique({
				where: { id: id }
			})

			return result
			
		} catch (error:any) {
			throw new Error(error.message)
		}
	}
}
