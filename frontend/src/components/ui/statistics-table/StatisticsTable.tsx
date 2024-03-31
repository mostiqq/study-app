import { FC } from 'react'
import styles from './StatisticsTable.module.scss'

interface IProps {
	result: number
}

const StatisticsTable: FC<IProps> = ({ result }) => {
	return (
		<div className={styles.main}>
			<div
				style={{
					height: `${result - 20}%`
				}}
				className={styles.block}
			></div>
			<div className={styles.line}></div>
			<span className={styles.span}>{result}</span>
		</div>
	)
}
export default StatisticsTable
