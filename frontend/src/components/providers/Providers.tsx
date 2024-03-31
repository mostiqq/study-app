'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

export default function Providers({ children }: PropsWithChildren) {
	const [client] = useState(new QueryClient())
	return (
		<QueryClientProvider client={client}>
			<ChakraProvider>{children}</ChakraProvider>
		</QueryClientProvider>
	)
}
