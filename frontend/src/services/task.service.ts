import { ITaskData } from '@/types/task.types'
import { API_URL } from '@/utils/constants'
import axios from 'axios'

class TaskService {
	async createTask(id: string | number, data: ITaskData) {
		const token = localStorage.getItem('token')
		const response = await axios.post<any, any, ITaskData>(
			`${API_URL}/tasks/${id}`,
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}
}

export default new TaskService()
