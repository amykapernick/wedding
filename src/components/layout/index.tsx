import type { ReactNode } from "react"
import Header from "@components/header";
import Footer from "@components/footer";
import Fathom from "@components/fathom";
import { currentUser, User } from "@clerk/nextjs/server";

type LayoutProps = {
	children: ReactNode
}

const Layout = async (props: LayoutProps) => {
	const { children } = props
	const user = (await currentUser()) as User;

	return (
		<>
			<Header isAuthenticated={!!user} />
			{children}
			<Footer />
			<Fathom />
		</>
	)
}

export default Layout