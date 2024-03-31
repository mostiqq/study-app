'use client'
import { Button, Heading, Input } from '@chakra-ui/react'
import styles from './AddSubject.module.scss'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ISubjectData } from '@/types/subject.types'
import subjectService from '@/services/subject.service'

export default function AddSubject() {
	const [name, setName] = useState<string>('')
	const [goal, setGoal] = useState()
	const [maxTasks, setMaxTasks] = useState()
	const router = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['add subject'],
		mutationFn: (data: ISubjectData) => subjectService.createSubject(data),
		onSuccess: () => {
			router.push('/subjects')
		}
	})
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) router.push('/login')
	}, [])
	const submitHandler = (e: FormEvent, data: ISubjectData) => {
		e.preventDefault()
		mutate(data)
	}
	return (
		<div className={styles.main}>
			<div className={styles.up}>
				<Heading marginRight='auto' as='h1' size='2xl'>
					Добавить предмет
				</Heading>
				<Button onClick={() => router.back()} colorScheme='messenger'>
					Назад
				</Button>
			</div>
			<form
				onSubmit={e => submitHandler(e, { name, goal, maxTasks })}
				className={styles.form}
			>
				<Input
					onChange={e => setName(e.target.value)}
					value={name}
					placeholder='Введите название'
					marginBottom='20px'
				/>
				<Input
					onChange={e => setGoal(+e.target.value)}
					value={goal}
					type='number'
					placeholder='Введите цель'
					marginBottom='20px'
				/>
				<Input
					onChange={e => setMaxTasks(+e.target.value)}
					value={maxTasks}
					type='number'
					placeholder='Введите количество заданий'
					marginBottom='20px'
				/>
				<Button type='submit' colorScheme='green'>
					Добавить предмет
				</Button>
			</form>
		</div>
	)
}
