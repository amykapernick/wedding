import Close from '@img/icons/close.svg'
import styles from './styles.module.css'

type DialogProps = {
	openButton: React.ReactNode
	dialog: React.RefObject<HTMLDialogElement>
	closeModal?: () => void
	openModal?: () => void
	children: React.ReactNode
}

const Dialog = ({ children, openButton, dialog, closeModal, openModal }: DialogProps) =>
{
	const handleClose = () =>
	{
		if (closeModal) closeModal()
		else dialog.current?.close()
	}
	const handleOpen = () =>
	{
		if (openModal) openModal()
		else dialog.current?.showModal()
	}

	return (
		<>
			<dialog ref={dialog} className={styles.dialog}>
				<button onClick={handleClose} className={styles.close}>
					<Close />
					<span className="sr-only">Close</span>
				</button>
				<div className={styles.container}>
					{children}
				</div>
			</dialog>
			<button className={styles.open} onClick={handleOpen}>
				{openButton}
			</button>
		</>
	)
}

export default Dialog