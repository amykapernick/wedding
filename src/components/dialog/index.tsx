import Close from '@img/icons/close.svg'
import styles from './styles.module.css'
import { ReactNode, RefObject, useEffect } from 'react'

type DialogProps = {
	openButton?: ReactNode
	dialog: RefObject<HTMLDialogElement>
	closeModal?: () => void
	openModal?: () => void
	children: ReactNode
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

	useEffect(() => {
		if(!openButton) {
			dialog.current?.showModal()
		}
	})

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
			{openButton &&
				<button className={styles.open} onClick={handleOpen}>
					{openButton}
				</button>
			}
		</>
	)
}

export default Dialog