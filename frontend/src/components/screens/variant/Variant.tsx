'use client'
import { usePathname, useRouter } from 'next/navigation'
import styles from './Variant.module.scss'
import { Button, Heading } from '@chakra-ui/react'
import TaskCard from '@/components/ui/task-card/TaskCard'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import variantService from '@/services/variant.service'

export default function Variant() {
	const pathname = usePathname()
	const segments = pathname.split('/')
	const pageId = segments[segments.length - 1]
	const router = useRouter()
	const { data, isLoading } = useQuery({
		queryKey: ['get variant'],
		queryFn: () => variantService.getById(pageId)
	})

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) router.push('/login')
	}, [])
	return (
		<div className={styles.main}>
			<div className={styles.up}>
				<Heading marginRight='auto' as='h1' size='xl'>
					{isLoading ? <div>Loading ...</div> : data?.name}
				</Heading>
				<Button onClick={() => router.back()} colorScheme='messenger'>
					Назад
				</Button>
			</div>
			<div className={styles.list}>
				{isLoading ? (
					<div>Loading ...</div>
				) : (
					data?.tasks.map(task => (
						<TaskCard key={task.id} result={task.result} number={task.number} />
					))
				)}
			</div>
			<Heading as='h2' size='md'>
				{`Итоговый балл: ${data?.result}`}
			</Heading>
		</div>
	)
}
