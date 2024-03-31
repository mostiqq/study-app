'use client'
import { usePathname, useRouter } from 'next/navigation'
import styles from './BySubject.module.scss'
import { Button, Heading } from '@chakra-ui/react'
import BySubjectCard from '@/components/ui/by-subject-card/BySubjectCard'
import Link from 'next/link'
import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import subjectService from '@/services/subject.service'
import variantService from '@/services/variant.service'

export default function BySubject() {
	const pathname = usePathname()
	const router = useRouter()
	const segments = pathname.split('/')
	const pageId = segments[segments.length - 1]

	const { data } = useQuery({
		queryKey: ['get variants by subject'],
		queryFn: () => subjectService.getById(pageId)
	})

	const { mutate } = useMutation({
		mutationKey: ['add variant'],
		mutationFn: () => variantService.createVariant(pageId)
	})

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) router.push('/login')
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.up}>
				<Heading marginRight='auto' as='h1' size='xl'>
					Варианты по предмету: {data?.name}
				</Heading>
				<Button onClick={() => router.back()} colorScheme='messenger'>
					Назад
				</Button>
			</div>
			<div className={styles.list}>
				{data?.variants?.map(variant => (
					<BySubjectCard
						createdAt={variant.createdAt}
						id={variant.id}
						key={variant.id}
						title={variant.name}
						result={variant.result}
					/>
				))}
			</div>
			<Link
				onClick={() => mutate()}
				className={styles.link}
				href={`/add-variant/${pageId}`}
			>
				Добавить вариант
			</Link>
		</div>
	)
}
