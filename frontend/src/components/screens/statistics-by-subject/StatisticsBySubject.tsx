'use client'
import { Button, Heading, Text } from '@chakra-ui/react'
import styles from './StatisticsBySubject.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import StatisticsTable from '@/components/ui/statistics-table/StatisticsTable'
import StatisticsSingleCard from '@/components/ui/statistics-single-card/StatisticsSingleCard'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import subjectService from '@/services/subject.service'
import variantService from '@/services/variant.service'

export default function StatisticsBySubject() {
	const router = useRouter()
	const pathname = usePathname()
	const segments = pathname.split('/')
	const pageId = segments[segments.length - 1]
	const { data: variantName, isLoading: isLoadingVariantName } = useQuery({
		queryKey: ['get single subject'],
		queryFn: () => subjectService.getById(pageId)
	})

	const { data: lastVariants, isLoading: isLoadingLastVariants } = useQuery({
		queryKey: ['get last variants'],
		queryFn: () => variantService.getLastVariants(pageId)
	})

	const { data: maxVariant, isLoading: isLoadingMaxVariant } = useQuery({
		queryKey: ['get max variant'],
		queryFn: () => variantService.getMaxVariant(pageId)
	})

	const { data: minVariant, isLoading: isLoadingMinVariant } = useQuery({
		queryKey: ['get min variant'],
		queryFn: () => variantService.getMinVariant(pageId)
	})

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) router.push('/login')
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.up}>
				<Heading marginRight='auto' as='h1' size='xl'>
					Статистика по предмету:{' '}
					{isLoadingVariantName ? <div>Loading ...</div> : variantName?.name}
				</Heading>
				<Button onClick={() => router.back()} colorScheme='messenger'>
					Назад
				</Button>
			</div>
			<div className={styles.list}>
				{isLoadingLastVariants ? (
					<div>Loading ...</div>
				) : (
					lastVariants?.map(result => (
						<StatisticsTable key={result.id} result={result.result} />
					))
				)}
			</div>
			<Heading size='xl' marginBottom='50px'>
				Ваш лучший результат
			</Heading>
			{isLoadingMaxVariant ? (
				<div>Loading ...</div>
			) : (
				<StatisticsSingleCard
					name={maxVariant.name}
					result={maxVariant.result}
					id={maxVariant.id}
				/>
			)}
			<Heading size='xl' marginBottom='50px'>
				Ваш худший результат
			</Heading>
			{isLoadingMinVariant ? (
				<div>Loading ...</div>
			) : (
				<StatisticsSingleCard
					name={minVariant.name}
					result={minVariant.result}
					id={minVariant.id}
				/>
			)}
		</div>
	)
}
