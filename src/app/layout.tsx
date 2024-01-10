import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import Header from '@parts/header'
import Footer from '@parts/footer'
import '@styles/app.css'



export const metadata = {
	title: `Daniel & Amy's Wedding`,
	description: 'Daniel & Amy are getting married',
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
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</ClerkProvider>
	)
}


