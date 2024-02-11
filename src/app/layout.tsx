import { ClerkProvider } from '@clerk/nextjs'
import Header from '@parts/header'
import Footer from '@parts/footer'
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
					<script src="https://cdn.usefathom.com/script.js" data-site={process.env.NEXT_PUBLIC_FATHOM_SITE} defer></script>
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


