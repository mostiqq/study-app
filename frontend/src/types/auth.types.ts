export interface IFormData {
	name: string
	password: string
}

export interface ILoginUser {
	id: number
	createdAt: string
	updatedAt: string
	name: string
}

export interface ILoginResponse {
	user: ILoginUser
}

export interface IRegisterResponse extends ILoginResponse {
	accessToken: string
}
