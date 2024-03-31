'use client'
import styles from './Home.module.scss'
import { Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import NavMenu from '@/components/ui/nav-menu/NavMenu'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import subjectService from '@/services/subject.service'

export default function Home() {
	const { push } = useRouter()
	const { data, isLoading } = useQuery({
		queryKey: ['count subjects'],
		queryFn: () => subjectService.countSubjects()
	})

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) push('/login')
	}, [])

	return (
		<div className={styles.main}>
			<NavMenu active='main' />
			<div className={styles.center}>
				<Heading as='h1' size='3xl' marginBottom={10}>
					Приложение для подготовки к ЕГЭ
				</Heading>
				<Text fontSize='large' className={styles.desc} marginBottom={70}>
					С помощью этого приложения вы можете контролировать свою подготовку к
					ЕГЭ
				</Text>
				{isLoading ? (
					<div>Loading...</div>
				) : data === 0 ? (
					<Text fontSize='md'>
						У вас нет предметов.{' '}
						<Link href='/add-subject' className={styles.AddLink}>
							Добавить предмет
						</Link>
					</Text>
				) : (
					''
				)}
			</div>
		</div>
	)
}
