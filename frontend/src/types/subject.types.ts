import { IVariant } from './variant.types'

export interface ISubject {
	id: number
	name: string
	goal: number
}

export interface ISubjectFull {
	id: number
	name: string
	variants: IVariant[]
}

export interface IMaxTasks {
	maxTasks: number
}

export interface ISubjectData {
	name: string
	goal: number
	maxTasks: number
}

export interface ISubjectName {
	name: string
}
