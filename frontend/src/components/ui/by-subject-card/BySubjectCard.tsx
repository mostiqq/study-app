import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Stack,
	Text
} from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import styles from './BySubjectCard.module.scss'
import { useFormatDate } from '@/utils/useFormatDate'
interface IProps {
	title: string
	result: number
	id: number
	createdAt: string
}

const BySubjectCard: FC<IProps> = ({ title, result, id, createdAt }) => {
	const date = useFormatDate(createdAt)

	return (
		<Card maxW='sm'>
			<CardBody>
				<Stack mt='6' spacing='3'>
					<Heading size='md'>{title}</Heading>
					<Text>Создан: {date}</Text>
					<Text color='blue.600' fontSize='2xl'>
						Результат: {result}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter display='flex' flexDirection='column' alignItems='center'>
				<Link className={styles.link} href={`/variants/${id}`}>
					Посмотреть вариант
				</Link>
			</CardFooter>
		</Card>
	)
}
export default BySubjectCard
