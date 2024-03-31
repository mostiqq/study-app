import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './dto/task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async create(userId: number, dto: TaskDto, subjectId: number) {
		return await this.prisma.task.create({
			data: {
				number: dto.number,
				result: dto.result,
				user: {
					connect: {
						id: userId
					}
				},
				subject: {
					connect: {
						id: subjectId
					}
				},
				variant: {
					connect: {
						id: dto.variantId
					}
				}
			}
		})
	}
}
