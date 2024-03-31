import { IsNumber, IsString } from 'class-validator'

export class SubjectDto {
	@IsNumber()
	goal: number

	@IsString()
	name: string

	@IsNumber()
	maxTasks: number
}
