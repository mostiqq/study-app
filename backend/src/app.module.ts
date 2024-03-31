import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SubjectModule } from './subject/subject.module';
import { VariantModule } from './variant/variant.module';
import { TaskModule } from './task/task.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, SubjectModule, VariantModule, TaskModule]
})
export class AppModule {}
