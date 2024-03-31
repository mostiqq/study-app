import { ISubjectName } from './subject.types'
import { ITask } from './task.types'

export interface IVariant {
	id: number
	name: string
	createdAt: string
	result: number
}

export interface IVariantBest {
	id: number
	name: string
	result: number
}

export interface IVariantData {
	name: string
	result: number
}

export interface IVariantGetAll extends IVariant {
	subject: ISubjectName
}

export interface IVariantFull {
	id: number
	name: string
	result: number
	tasks: ITask[]
}

export interface IVariantLast {
	id: number
	createdAt: string
	updatedAt: string
	name: string
	result: number
	userId: number
	subjectId: number
}

export interface IVariantStatisticLast {
	id: number
	result: number
}
