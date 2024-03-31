'use client'
import NavMenu from '@/components/ui/nav-menu/NavMenu'
import styles from './Variants.module.scss'
import { Heading } from '@chakra-ui/react'
import VariantCard from '@/components/ui/variant-card/VariantCard'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import variantService from '@/services/variant.service'
import { useFormatDate } from '@/utils/useFormatDate'
import { useVariants } from '@/utils/useVariants'

export default function Variants() {
	const { push } = useRouter()
	const { data, isLoading } = useVariants()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) push('/login')
	}, [])
	return (
		<div className={styles.main}>
			<NavMenu active='variants' />
			<div className={styles.center}>
				<Heading as='h1' size='3xl'>
					Варианты
				</Heading>
				<div className={styles.list}>
					{isLoading ? (
						<div>Loading ...</div>
					) : (
						data.map(variant => (
							<VariantCard
								createdAt={variant.createdAt}
								id={variant.id}
								key={variant.id}
								title={variant.name}
								result={variant.result}
								subject={variant.subject.name}
							/>
						))
					)}
				</div>
			</div>
		</div>
	)
}
