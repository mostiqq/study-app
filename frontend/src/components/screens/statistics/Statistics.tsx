'use client'
import { Heading } from '@chakra-ui/react'
import styles from './Statistics.module.scss'
import StatisticsCard from '@/components/ui/statistics-card/StatisticsCard'
import NavMenu from '@/components/ui/nav-menu/NavMenu'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSubjects } from '@/utils/useSubjects'

export default function Statistics() {
	const { push } = useRouter()
	const { data, isLoading } = useSubjects()
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) push('/login')
	}, [])
	return (
		<div>
			<NavMenu active='statistics' />

			<div className={styles.main}>
				<Heading as='h1' size='2xl'>
					Статистика
				</Heading>
				<div className={styles.list}>
					{isLoading ? (
						<div>Loading ...</div>
					) : (
						data.map(subject => (
							<StatisticsCard
								id={subject.id}
								key={subject.id}
								name={subject.name}
							/>
						))
					)}
				</div>
			</div>
		</div>
	)
}
