import variantService from '@/services/variant.service'
import { useQuery } from '@tanstack/react-query'

export const useVariants = () => {
	return useQuery({
		queryKey: ['get all variants'],
		queryFn: () => variantService.getAll()
	})
}
