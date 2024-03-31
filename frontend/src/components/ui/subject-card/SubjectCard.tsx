import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Text
} from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import styles from './SubjectCard.module.scss'
import { useMutation } from '@tanstack/react-query'
import subjectService from '@/services/subject.service'
import { useSubjects } from '@/utils/useSubjects'

interface IProps {
	title: string
	goal: number
	id: number
}

const SubjectCard: FC<IProps> = ({ title, goal, id }) => {
	const { refetch } = useSubjects()

	const { mutate } = useMutation({
		mutationKey: ['delete subject'],
		mutationFn: (id: string | number) => subjectService.deleteSubject(id),
		onSuccess: () => {
			refetch()
		}
	})

	return (
		<Card>
			<CardHeader>
				<Heading size='md'>{title}</Heading>
			</CardHeader>
			<CardBody>
				<Text>Цель по предмету: {goal}</Text>
			</CardBody>
			<CardFooter alignItems='center' gap='10px' flexDirection='column'>
				<Link className={styles.link} href={`/variants/by-subject/${id}`}>
					Посмотреть варианты
				</Link>
				<Button
					onClick={() => mutate(id)}
					fontSize={15}
					width={150}
					colorScheme='red'
				>
					Удалить предмет
				</Button>
			</CardFooter>
		</Card>
	)
}
export default SubjectCard
