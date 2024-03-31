import {
	IFormData,
	ILoginResponse,
	IRegisterResponse
} from '@/types/auth.types'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

class AuthService {
	async login(data: IFormData) {
		const response = await axios.post<IRegisterResponse>(
			`${API_URL}/auth/login`,
			data
		)
		return response.data
	}

	async register(data: IFormData) {
		const response = await axios.post<IRegisterResponse>(
			`${API_URL}/auth/register`,
			data
		)
		return response.data
	}
}

export default new AuthService()
