import { Card, CardFooter, CardHeader, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'
import styles from './StatisticsCard.module.scss'

interface IProps {
	id: number
	name: string
}

const StatisticsCard: FC<IProps> = ({ name, id }) => {
	return (
		<Card align='center'>
			<CardHeader>
				<Heading size='md'>{name}</Heading>
			</CardHeader>
			<CardFooter>
				<Link className={styles.link} href={`/statistics/by-subject/${id}`}>
					Посмотреть статистику
				</Link>
			</CardFooter>
		</Card>
	)
}
export default StatisticsCard
