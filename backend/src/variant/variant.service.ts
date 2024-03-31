import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { VariantDto } from './dto/variant.dto'

@Injectable()
export class VariantService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: number) {
		return await this.prisma.variant.findMany({
			where: {
				userId
			},
			select: {
				id: true,
				name: true,
				subject: {
					select: {
						name: true
					}
				},
				createdAt: true,
				result: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async getById(id: number) {
		return await this.prisma.variant.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				result: true,
				tasks: {
					select: {
						id: true,
						number: true,
						result: true
					}
				}
			}
		})
	}

	async create(userId: number, subjectId: number) {
		return await this.prisma.variant.create({
			data: {
				name: '',
				result: 0,
				user: {
					connect: {
						id: userId
					}
				},
				subject: {
					connect: {
						id: subjectId
					}
				}
			}
		})
	}

	async update(dto: VariantDto, id: number) {
		return await this.prisma.variant.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				result: dto.result
			}
		})
	}

	async delete(id: number) {
		return await this.prisma.variant.delete({
			where: {
				id
			}
		})
	}

	async getLastSubjects(userId: number, subjectId: number) {
		return await this.prisma.variant.findMany({
			take: 10,
			where: {
				userId,
				subjectId
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: {
				id: true,
				result: true
			}
		})
	}

	async getMaxResult(userId: number, subjectId: number) {
		return await this.prisma.variant.findFirst({
			where: {
				userId,
				subjectId
			},
			orderBy: {
				result: 'desc'
			},
			select: {
				id: true,
				name: true,
				result: true
			}
		})
	}

	async getMinResult(userId: number, subjectId: number) {
		return await this.prisma.variant.findFirst({
			where: {
				userId,
				subjectId
			},
			orderBy: {
				result: 'asc'
			},
			select: {
				id: true,
				name: true,
				result: true
			}
		})
	}

	async getLast(userId: number) {
		return await this.prisma.variant.findFirst({
			where: {
				userId
			},
			take: 1,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}
}
