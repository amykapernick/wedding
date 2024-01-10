import Image from 'next/image'
import HeaderImage from '@img/amy_dan.jpg'
import styles from './styles.module.css'

const Header = () =>
{
	return (
		<header className={styles.header}>
			<h1 className={styles.heading}>Daniel & Amy <span>are getting married</span></h1>
			<Image src={HeaderImage} alt="Daniel and Amy" className={styles.image} placeholder="blur" />
		</header>
	)
}

export default Header