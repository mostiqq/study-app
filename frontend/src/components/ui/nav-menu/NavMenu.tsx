'use client'
import { FC } from 'react'
import NavItem from '../nav-item/NavItem'
import styles from './NavMenu.module.scss'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
interface IProps {
	active: 'main' | 'subjects' | 'variants' | 'statistics'
}

const NavMenu: FC<IProps> = ({ active }) => {
	const { push } = useRouter()

	return (
		<nav className={styles.nav}>
			<div className={styles.NavLeft}>
				<NavItem
					content='Главная страница'
					link=''
					isActive={active === 'main' ? true : false}
				/>
				<NavItem
					content='Предметы'
					link='subjects'
					isActive={active === 'subjects' ? true : false}
				/>
				<NavItem
					content='Варианты'
					link='variants'
					isActive={active === 'variants' ? true : false}
				/>
				<NavItem
					content='Статистика'
					link='statistics'
					isActive={active === 'statistics' ? true : false}
				/>
			</div>
			<Button
				onClick={() => {
					localStorage.removeItem('token')
					push('/login')
				}}
				padding='12px 24px'
				colorScheme='messenger'
			>
				Выйти
			</Button>
		</nav>
	)
}
export default NavMenu
