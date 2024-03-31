import { FC } from 'react'
import { Card, CardBody, Text } from '@chakra-ui/react'

interface IProps {
	number: number
	result: number
}

const TaskCard: FC<IProps> = ({ number, result }) => {
	return (
		<Card>
			<CardBody>
				<Text>{`${number} задание. Первичный балл: ${result}`}</Text>
			</CardBody>
		</Card>
	)
}
export default TaskCard
