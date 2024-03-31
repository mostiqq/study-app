import { IsNumber } from 'class-validator'

export class TaskDto {
	@IsNumber()
	result: number

	@IsNumber()
	number: number

	@IsNumber()
	variantId: number
}
