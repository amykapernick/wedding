'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import { useState } from 'react'
import { updateGift } from '@app/actions'
import { useFormStatus } from 'react-dom'

const Gift = ({ properties, id }) =>
{
	const [purchased, setPurchased] = useState(properties['Purchased'].number || 0)
	const { pending } = useFormStatus()
	const claimGift = () =>
	{
		const data = purchased + 1
		setPurchased(data)
		updateGift(id, data)
	}

	return (
		<li
			className={styles.gift}
			data-price={properties['Price'].select?.name}
			data-purchased={purchased}
			data-quantity={properties['Quantity'].number}
			data-left={properties['Quantity'].number - purchased}
		>
			<h2 className={styles.name}>
				<a
					href={properties['URL'].url}
					target="_blank"
				>
					{properties['Name'].title[0].plain_text}
				</a>
			</h2>
			{properties['Image']?.files?.[0]?.file && <Image
				alt=""
				src={properties['Image'].files[0].file.url}
				width="300"
				height="300"
				className={styles.image}
			/>}
			<form action={claimGift} className={styles.button}>
				<button
					type="submit"
					disabled={purchased >= properties['Quantity'].number}
					aria-disabled={purchased >= properties['Quantity'].number}

				>
					{purchased >= properties['Quantity'].number ? 'Claimed' : `${ pending ? 'Claiming...' : 'Claim' }`}
				</button>
			</form>
		</li>
	)
}

export default Gift