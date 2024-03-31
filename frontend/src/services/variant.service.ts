import {
	IVariantBest,
	IVariantData,
	IVariantFull,
	IVariantGetAll,
	IVariantLast,
	IVariantStatisticLast
} from '@/types/variant.types'
import { API_URL } from '@/utils/constants'
import axios, { AxiosResponse } from 'axios'

class VariantService {
	async getAll() {
		const token = localStorage.getItem('token')
		const response = await axios.get<IVariantGetAll[]>(`${API_URL}/variants`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		return response.data
	}

	async getById(id: string | number) {
		const token = localStorage.getItem('token')
		const response = await axios.get<IVariantFull>(
			`${API_URL}/variants/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async getLast() {
		const token = localStorage.getItem('token')
		const response = await axios.get<IVariantLast>(
			`${API_URL}/variants/actions/get-last`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async getLastVariants(id: number | string) {
		const token = localStorage.getItem('token')
		const response = await axios.get<IVariantStatisticLast[]>(
			`${API_URL}/variants/statistics/get-last/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async getMinVariant(id: number | string) {
		const token = localStorage.getItem('token')
		const response = await axios.get<IVariantBest>(
			`${API_URL}/variants/statistics/get-min/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async getMaxVariant(id: number | string) {
		const token = localStorage.getItem('token')
		const response = await axios.get<IVariantBest>(
			`${API_URL}/variants/statistics/get-max/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async createVariant(id: string | number) {
		const token = localStorage.getItem('token')
		const response = await axios.post(`${API_URL}/variants/${id}`, null, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		return response.data
	}

	async updateVariant(id: string | number, data: IVariantData) {
		const token = localStorage.getItem('token')
		const response = await axios.put<any, any, IVariantData>(
			`${API_URL}/variants/${id}`,
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)

		return response.data
	}

	async deleteVariant(id: number | string) {
		const token = localStorage.getItem('token')
		const response = await axios.delete<any>(`${API_URL}/variants/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		return response.data
	}
}

export default new VariantService()
