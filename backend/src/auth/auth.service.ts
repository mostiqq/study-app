import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
	constructor(private jwt: JwtService, private userService: UserService) {}

	async login(dto: AuthDto) {
		const { password, ...user } = await this.validateUser(dto)

		const tokens = await this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByName(dto.name)

		if (oldUser) throw new BadRequestException('User already exists')

		const { password, ...user } = await this.userService.create(dto)

		const tokens = await this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByName(dto.name)

		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}

	private async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}
}
