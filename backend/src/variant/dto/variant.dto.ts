import { IsNumber, IsString } from 'class-validator'

export class VariantDto {
	@IsString()
	name: string

	@IsNumber()
	result: number
}
