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
import styles from './VariantCard.module.scss'

import { FC } from 'react'
import Link from 'next/link'
import { useFormatDate } from '@/utils/useFormatDate'
import { useVariants } from '@/utils/useVariants'
import { useMutation } from '@tanstack/react-query'
import variantService from '@/services/variant.service'

interface IProps {
	title: string
	subject: string
	result: number
	id: number
	createdAt: string
}

const VariantCard: FC<IProps> = ({ title, subject, result, id, createdAt }) => {
	const date = useFormatDate(createdAt)
	const { mutate } = useMutation({
		mutationKey: ['delete variant'],
		mutationFn: () => variantService.deleteVariant(id),
		onSuccess: () => {
			refetch()
		}
	})
	const { refetch } = useVariants()
	return (
		<Card minWidth='300px' maxW='sm'>
			<CardBody>
				<Stack mt='6' spacing='3'>
					<Heading size='md'>{title}</Heading>
					<Text>Предмет: {subject}</Text>
					<Text>Создан: {date}</Text>
					<Text color='blue.600' fontSize='2xl'>
						Результат: {result}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter alignItems='center' gap='10px' flexDirection='column'>
				<Link className={styles.link} href={`/variants/${id}`}>
					Посмотреть вариант
				</Link>
				<Button
					onClick={() => mutate()}
					fontSize={15}
					width={150}
					colorScheme='red'
				>
					Удалить вариант
				</Button>
			</CardFooter>
		</Card>
	)
}
export default VariantCard
