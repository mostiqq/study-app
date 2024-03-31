import { FC } from 'react'
import styles from './StatisticsSingleCard.module.scss'
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Heading,
	Text
} from '@chakra-ui/react'
import Link from 'next/link'

interface IProps {
	name: string
	result: number
	id: number
}

const StatisticsSingleCard: FC<IProps> = ({ name, result, id }) => {
	return (
		<Card marginBottom='50px' align='center'>
			<CardHeader>
				<Heading size='md'>{name}</Heading>
			</CardHeader>
			<CardBody>
				<Text>Результат: {result}</Text>
			</CardBody>
			<CardFooter>
				<Link className={styles.link} href={`/variants/${id}`}>
					Посмотреть вариант
				</Link>
			</CardFooter>
		</Card>
	)
}
export default StatisticsSingleCard
