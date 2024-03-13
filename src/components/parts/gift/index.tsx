'use client'

import Image from 'next/image'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { updateGift } from '@app/actions'
import { useFormStatus } from 'react-dom'
import type { NotionGift } from '@ts/gifts'
import { TrackEvent } from '@parts/fathom'
import { trackEvent } from 'fathom-client'
import Link from '@img/icons/link.svg'

const Gift = ({ properties, id }: NotionGift) =>
{
	const [purchased, setPurchased] = useState(properties['Purchased'].number || 0)
	const [buttonText, setButtonText] = useState('Claim')
	const [claimed, setClaimed] = useState(false)
	const { pending } = useFormStatus()
	const claimGift = () =>
	{
		const data = purchased + 1
		setPurchased(data)
		updateGift(id, data)
		setClaimed(true)
	}

	useEffect(() =>
	{
		if (purchased >= properties['Quantity'].number)
		{
			setButtonText('Confirmed')
		}
		else if (pending)
		{
			setButtonText('Confirming...')
		}
		else
		{
			setButtonText('Claim')
		}
	}, [purchased, pending])

	return (
		<>
			{claimed && <TrackEvent name="Gift Claimed" />}
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
						{properties['URL']?.url && <Link />}
						{properties['Name'].title.map(({ plain_text }) => plain_text).join('')}
					</a>
				</h2>
				{properties['Image']?.files?.[0]?.file && <div className={styles.image}>
					<Image
						alt=""
						src={properties['Image'].files[0].file.url}
						width="300"
						height="300"

					/>
				</div>}
				{id && <form action={claimGift} className={styles.button}>
					<button
						type="submit"
						disabled={purchased >= properties['Quantity'].number}
						aria-disabled={purchased >= properties['Quantity'].number}

					>
						{buttonText}
					</button>
				</form>}
				{purchased >= properties['Quantity'].number && <p className={styles.claimed}>Claimed</p>}
			</li>
		</>
	)
}

export default Gift