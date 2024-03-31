import Link from 'next/link'
import { FC } from 'react'
import styles from './NavItem.module.scss'

interface IProps {
	link: string
	content: string
	isActive: boolean
}

const NavItem: FC<IProps> = ({ link, content, isActive }) => {
	return (
		<Link
			className={styles.link}
			style={{
				color: isActive ? '#2a27e9' : 'white'
			}}
			href={`/${link}`}
		>
			{content}
		</Link>
	)
}
export default NavItem
