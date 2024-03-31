import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SubjectDto } from './dto/subject.dto'

@Injectable()
export class SubjectService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: number) {
		return await this.prisma.subject.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				name: true,
				goal: true
			}
		})
	}

	async getById(id: number) {
		return await this.prisma.subject.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				variants: {
					select: {
						id: true,
						name: true,
						createdAt: true,
						result: true
					}
				}
			}
		})
	}

	async create(userId: number, dto: SubjectDto) {
		return await this.prisma.subject.create({
			data: {
				name: dto.name,
				goal: dto.goal,
				maxTasks: dto.maxTasks,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async delete(id: number) {
		return await this.prisma.subject.delete({
			where: {
				id
			}
		})
	}

	async countSubjects(userId: number) {
		return await this.prisma.subject.count({
			where: {
				userId
			}
		})
	}

	async getMaxTasks(id: number) {
		return await this.prisma.subject.findUnique({
			where: {
				id
			},
			select: {
				id: false,
				name: false,
				createdAt: false,
				updatedAt: false,
				goal: false,
				user: false,
				userId: false,
				variants: false,
				tasks: false,
				maxTasks: true
			}
		})
	}
}
