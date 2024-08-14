'use client'

import Image from 'next/image'
import HeaderImage from '@img/amy_dan.jpg'
import styles from './styles.module.css'
import { usePathname } from 'next/navigation'

type HeaderProps = {
	isAuthenticated: boolean
}

const Header = (props: HeaderProps) =>
{
	const { isAuthenticated } = props
	const path = usePathname()
	const compactHeader = (path !== '/') || !isAuthenticated

	return (
		<header 
			className={[
				styles.header,
				compactHeader ? styles.compact : ''
			].join(' ')}
		>
			<p className={styles.heading}>Daniel & Amy <span>are getting married</span></p>
			<Image
				src={HeaderImage}
				alt="Daniel and Amy"
				className={styles.image}
				placeholder="blur"
				loading="eager"
			/>
			<a className={styles.button} href="/#rsvp">RSVP</a>
		</header>
	)
}

export default Header