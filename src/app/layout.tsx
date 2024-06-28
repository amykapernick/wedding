import { ClerkProvider } from "@clerk/nextjs";
import Header from "@components/header";
import Footer from "@components/footer";
import Fathom from "@components/fathom";
import "@styles/app.css";

export const metadata = {
	title: `Daniel & Amy's Wedding`,
	description: "Daniel & Amy are getting married",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
	);
}
