import { IsString, MinLength } from 'class-validator'

export class AuthDto {
	@MinLength(4, {
		message: 'Имя должно содержать минимум 4 символа'
	})
	@IsString()
	name: string

	@MinLength(6, {
		message: 'Пароль должен содержать минимум 6 символов'
	})
	@IsString()
	password: string
}
