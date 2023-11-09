import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'

import '@styles/app.css'


export const metadata = {
	title: `Daniel and Amy's Wedding`,
	description: 'Generated by create next app',
}

export default function RootLayout ({
	children,
}: {
	children: React.ReactNode
})
{
	return (
		<ClerkProvider>
			<html lang="en">
				<head>
					<title>{metadata.title}</title>
				</head>
				<body>
					<header>
						<h1>Dan and Amy are getting married!</h1>
					</header>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}


