import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { SubjectService } from './subject.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SubjectDto } from './dto/subject.dto'

@Controller('subjects')
export class SubjectController {
	constructor(private readonly subjectService: SubjectService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') id: number) {
		return this.subjectService.getAll(id)
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.subjectService.getById(+id)
	}

	@Get('actions/max-tasks/:id')
	@Auth()
	async getMaxTasks(@Param('id') id: string) {
		return this.subjectService.getMaxTasks(+id)
	}

	@Get('actions/count')
	@Auth()
	async count(@CurrentUser('id') id: number) {
		return this.subjectService.countSubjects(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@CurrentUser('id') id: number, @Body() dto: SubjectDto) {
		return this.subjectService.create(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.subjectService.delete(+id)
	}
}
