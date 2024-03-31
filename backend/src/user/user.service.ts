import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUsers() {
		return this.prisma.user.findMany({
			select: {
				name: true,
				id: true,
				password: false
			}
		})
	}

	async getById(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async getByName(name: string) {
		return this.prisma.user.findUnique({
			where: {
				name
			}
		})
	}

	async create(dto: AuthDto) {
		const user = {
			name: dto.name,
			password: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}
}
