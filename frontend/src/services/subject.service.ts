import {
	IMaxTasks,
	ISubject,
	ISubjectData,
	ISubjectFull
} from '@/types/subject.types'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

class SubjectService {
	async getAll() {
		const token = localStorage.getItem('token')
		const response = await axios.get<ISubject[]>(`${API_URL}/subjects`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		return response.data
	}

	async getById(id: number | string) {
		const token = localStorage.getItem('token')
		const response = await axios.get<ISubjectFull>(
			`${API_URL}/subjects/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async getMaxTasks(id: number | string) {
		const token = localStorage.getItem('token')
		const response = await axios.get<IMaxTasks>(
			`${API_URL}/subjects/actions/max-tasks/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async countSubjects() {
		const token = localStorage.getItem('token')
		const response = await axios.get<number>(
			`${API_URL}/subjects/actions/count`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async createSubject(data: ISubjectData) {
		const token = localStorage.getItem('token')
		const response = await axios.post<any, any, ISubjectData>(
			`${API_URL}/subjects`,
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async deleteSubject(id: number | string) {
		const token = localStorage.getItem('token')
		const response = await axios.delete<any>(`${API_URL}/subjects/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		return response.data
	}
}

export default new SubjectService()
