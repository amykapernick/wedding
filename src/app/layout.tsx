import { ClerkProvider } from "@clerk/nextjs";
import "@styles/app.css";
import Layout from "@components/layout";

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
					<meta charSet="utf-8" />
					<meta http-equiv="x-ua-compatible" content="ie=edge" />
					<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
					<meta name="theme-color" content="#275942" />
				</head>
				<body>
					<Layout>
						{children}
					</Layout>
				</body>
			</html>
		</ClerkProvider>
	);
}
