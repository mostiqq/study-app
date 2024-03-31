'use client'
import { Heading, Button, Input } from '@chakra-ui/react'
import styles from './AddVariant.module.scss'
import { usePathname, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ITaskData } from '@/types/task.types'
import taskService from '@/services/task.service'
import variantService from '@/services/variant.service'
import subjectService from '@/services/subject.service'
import { IVariantData } from '@/types/variant.types'

export default function AddVariant() {
	const [task, setTask] = useState<number>()
	const [name, setName] = useState<string>('')
	const [currentTask, setCurrentTask] = useState<number>(1)
	const [firstResult, setFirstResult] = useState<number>(0)
	const [result, setResult] = useState<string>('')
	const router = useRouter()
	const pathname = usePathname()
	const segments = pathname.split('/')
	const pageId = segments[segments.length - 1]

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) router.push('/login')
	}, [])

	const { mutate: mutateTask } = useMutation({
		mutationKey: ['add task'],
		mutationFn: (data: ITaskData) => taskService.createTask(pageId, data)
	})

	const { data: lastData } = useQuery({
		queryKey: ['get last variant'],
		queryFn: () => variantService.getLast()
	})

	const { data: maxTasks, isLoading } = useQuery({
		queryKey: ['get max tasks'],
		queryFn: () => subjectService.getMaxTasks(pageId)
	})

	const { mutate: updateVariant } = useMutation({
		mutationKey: ['update variant'],
		mutationFn: (data: IVariantData) =>
			variantService.updateVariant(lastData?.id, data)
	})

	const submitHandler = (e: FormEvent<HTMLFormElement>, taskData: any) => {
		e.preventDefault()
		mutateTask({ number: currentTask, result: task, variantId: lastData?.id })
		setCurrentTask(currentTask + 1)
		setFirstResult(firstResult + +task)
		setTask(0)
	}

	const resultSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (result.length !== 0) {
			updateVariant({ name: name, result: +result })
			router.push('/variants')
		}
	}

	return (
		<div className={styles.main}>
			<div className={styles.up}>
				<Heading marginRight='auto' as='h1' size='2xl'>
					Добавить вариант
				</Heading>
				<Button onClick={() => router.back()} colorScheme='messenger'>
					Назад
				</Button>
			</div>
			{isLoading ? (
				<div>Loading</div>
			) : currentTask <= maxTasks?.maxTasks ? (
				//@ts-ignore
				<form onSubmit={e => submitHandler(e)} className={styles.form}>
					<label>
						{currentTask} задание
						<Input
							value={task}
							type='number'
							onChange={e => setTask(+e.target.value)}
							placeholder='Введите количество баллов'
							marginBottom='20px'
							marginTop='10px'
						/>
					</label>
					<Button type='submit' colorScheme='green'>
						Добавить вариант
					</Button>
				</form>
			) : (
				<>
					<Heading size='xl'>Ваш первичный балл: {firstResult}</Heading>
					<Link
						className={styles.link}
						href='https://4ege.ru/novosti-ege/4023-shkala-perevoda-ballov-ege.html'
						target='_blank'
					>
						Посмотреть шкалу перевода
					</Link>
					<form onSubmit={e => resultSubmitHandler(e)} className={styles.form}>
						<Input
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Введите название варианта'
							marginBottom='20px'
							marginTop='10px'
						/>
						<Input
							value={result}
							onChange={e => setResult(e.target.value)}
							placeholder='Введите итоговое количество баллов'
							marginBottom='20px'
							marginTop='10px'
						/>
						<Button type='submit' colorScheme='green'>
							Сохранить вариант
						</Button>
					</form>
				</>
			)}
		</div>
	)
}
