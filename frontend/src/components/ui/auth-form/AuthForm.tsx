'use client'
import { FC, FormEvent, useState } from 'react'
import styles from './AuthForm.module.scss'
import { Button, Heading, Input } from '@chakra-ui/react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { IFormData } from '@/types/auth.types'
import authService from '@/services/auth.service'
import { useRouter } from 'next/navigation'

interface IProps {
	isLogin: boolean
}

const AuthForm: FC<IProps> = ({ isLogin }) => {
	const [name, setName] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { push } = useRouter()

	const { mutate: mutateLogin } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IFormData) => authService.login(data),
		onSuccess: data => {
			localStorage.setItem('token', data.accessToken)
			push('/')
		}
	})

	const { mutate: mutateRegister } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IFormData) => authService.register(data),
		onSuccess: data => {
			localStorage.setItem('token', data.accessToken)
			push('/')
		}
	})

	const submitHandler = (data: IFormData, e: FormEvent) => {
		e.preventDefault()
		isLogin ? mutateLogin(data) : mutateRegister(data)
		console.log(name, password)
	}

	return (
		<div className={styles.main}>
			<Heading marginBottom='100px' as='h1' size='2xl'>
				{isLogin ? 'Вход' : 'Регистрация'}
			</Heading>
			<form
				onSubmit={e => submitHandler({ name, password }, e)}
				className={styles.form}
			>
				<Input
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Введите имя'
				/>
				<Input
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Введите пароль'
					type='password'
				/>
				<Button minWidth='200px' type='submit' colorScheme='green'>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</Button>
			</form>
			{isLogin ? (
				<span>
					Нет аккаунта?{' '}
					<Link className={styles.link} href='/register'>
						Зарегистрироваться
					</Link>
				</span>
			) : (
				<span>
					Есть аккаунт?{' '}
					<Link className={styles.link} href='/login'>
						Войти
					</Link>
				</span>
			)}
		</div>
	)
}
export default AuthForm
