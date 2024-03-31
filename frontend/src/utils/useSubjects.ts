import subjectService from '@/services/subject.service'
import { useQuery } from '@tanstack/react-query'

export const useSubjects = () => {
	return useQuery({
		queryKey: ['get all subjects'],
		queryFn: () => subjectService.getAll()
	})
}
