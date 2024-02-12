import { ClerkProvider } from '@clerk/nextjs'
import Header from '@parts/header'
import Footer from '@parts/footer'
import Fathom from '@parts/fathom'
import '@styles/app.css'

export const metadata = {
	title: `Daniel & Amy's Wedding`,
	description: 'Daniel & Amy are getting married',
}

export default function RootLayout ({
	children,
}: Readonly<{
	children: React.ReactNode
}>)
{
	return (
		<ClerkProvider>
			<html lang="en-AU">
				<head>
					<title>{metadata.title}</title>
				</head>
				<body>
					<Header />
					{children}
					<Footer />
					<Fathom />
				</body>
			</html>
		</ClerkProvider>
	)
}


