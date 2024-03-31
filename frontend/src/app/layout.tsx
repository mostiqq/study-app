import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.scss'
import Providers from '@/components/providers/Providers'

const inter = Raleway({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
	title: 'Study app',
	description: 'Лучшее приложения для подготовки к ЕГЭ'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
