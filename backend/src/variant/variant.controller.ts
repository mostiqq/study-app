import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { VariantService } from './variant.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { VariantDto } from './dto/variant.dto'

@Controller('variants')
export class VariantController {
	constructor(private readonly variantService: VariantService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') id: number) {
		return this.variantService.getAll(id)
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.variantService.getById(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post(':subjectId')
	async create(
		@CurrentUser('id') id: number,
		@Param('subjectId') subjectId: string
	) {
		return this.variantService.create(id, +subjectId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: VariantDto) {
		return this.variantService.update(dto, +id)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.variantService.delete(+id)
	}

	@Get('statistics/get-last/:subjectId')
	@Auth()
	async getLastSubjects(
		@CurrentUser('id') id: number,
		@Param('subjectId') subjectId: string
	) {
		return this.variantService.getLastSubjects(id, +subjectId)
	}

	@Get('statistics/get-max/:subjectId')
	@Auth()
	async getMaxResult(
		@CurrentUser('id') id: number,
		@Param('subjectId') subjectId: string
	) {
		return this.variantService.getMaxResult(id, +subjectId)
	}

	@Get('statistics/get-min/:subjectId')
	@Auth()
	async getMinResult(
		@CurrentUser('id') id: number,
		@Param('subjectId') subjectId: string
	) {
		return this.variantService.getMinResult(id, +subjectId)
	}

	@Get('/actions/get-last')
	@Auth()
	async getLast(@CurrentUser('id') id: number) {
		return this.variantService.getLast(id)
	}
}
