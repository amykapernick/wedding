'use client'

type PrintButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode
}

const PrintButton = (props: PrintButtonProps) =>
{
	const { children, ...args } = props

	return (
		<button {...args} onClick={() => window.print()}>
			{children}
		</button>
	)
}

export default PrintButton