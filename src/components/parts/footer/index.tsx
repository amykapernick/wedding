import Image from 'next/image'
import FooterImage from '@img/footer_image.jpg'
import styles from './styles.module.css'
// import FrameBottom from '@img/frame_bottom.svg'
import FrameBottom from '@img/frame_bottom.png'

const Footer = () =>
{
	return (
		<footer className={styles.footer}>
			<p className={styles.quote}>We hope you'll join us on our special day</p>
			<figure className={styles.image}>
				<Image src={FooterImage} alt="Daniel and Amy" placeholder="blur" />
			</figure>
			{/* <FrameBottom className={styles.frame} /> */}
			<Image src={FrameBottom} alt="" className={styles.frame} />
		</footer>
	)
}

export default Footer