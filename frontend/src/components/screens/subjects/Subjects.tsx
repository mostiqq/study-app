'use client'
import NavMenu from '@/components/ui/nav-menu/NavMenu'
import styles from './Subjects.module.scss'
import { Heading } from '@chakra-ui/react'
import SubjectCard from '@/components/ui/subject-card/SubjectCard'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import subjectService from '@/services/subject.service'
import { useSubjects } from '@/utils/useSubjects'

export default function Subjects() {
	const { push } = useRouter()

	const { data, isLoading } = useSubjects()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) push('/login')
	}, [])
	return (
		<div className={styles.main}>
			<NavMenu active='subjects' />
			<div className={styles.center}>
				<Heading as='h1' size='3xl'>
					Предметы
				</Heading>
				<div className={styles.list}>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						data?.map(subject => (
							<SubjectCard
								key={subject.id}
								title={subject.name}
								goal={subject.goal}
								id={subject.id}
							/>
						))
					)}
				</div>
				<Link className={styles.link} href='/add-subject'>
					Добавить предмет
				</Link>
			</div>
		</div>
	)
}
