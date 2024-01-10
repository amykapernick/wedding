'use client'

import { Child as ChildType } from "@ts/people";
import { useState } from "react";
import styles from '../styles.module.css'

const Child = (person: ChildType) =>
{
	const { id, name, attending, dietary, age } = person
	const [status, setStatus] = useState(attending === 'Yes')
	const [nameLength, setNameLength] = useState(name.length)
	const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNameLength(e.target.value.length)

	return (
		<div>
			<fieldset className={[styles.radio, styles.short].join(' ')}>
				<legend className="sr-only">Will {name} be attending?</legend>
				<label htmlFor={`name_${ id }`} className="sr-only">Name</label>
				<span className={styles.name}>
					Will
					<span>
						<input
							type="text"
							name={`name_${ id }`}
							id={`name_${ id }`}
							defaultValue={name}
							required
							style={{ '--chars': nameLength } as React.CSSProperties}
							onChange={nameChange}
						/>
					</span>
					be attending?
				</span>
				<div>
					<input
						type="radio"
						name={`attending_${ id }`}
						id={`attending_${ id }_yes`}
						value="Yes"
						checked={status}
						onChange={() => setStatus(true)}
					/>
					<label
						htmlFor={`attending_${ id }_yes`}
					>
						Yes
					</label>
					<input
						type="radio"
						name={`attending_${ id }`}
						id={`attending_${ id }_no`}
						value="No"
						checked={!status}
						onChange={() => setStatus(false)}
					/>
					<label
						htmlFor={`attending_${ id }_no`}
					>
						No
					</label>
				</div>
			</fieldset>

			{status && <>
				<input type="hidden" name={`child_${ id }`} value="true" />
				<label htmlFor={`age_${ id }`}>Age</label>
				<input type="text" name={`age_${ id }`} id={`age_${ id }`} defaultValue={age} required />

				<label htmlFor={`dietary_${ id }`}>Dietary requirements</label>
				<textarea name={`dietary_${ id }`} id={`dietary_${ id }`} defaultValue={dietary}></textarea>
			</>}
		</div>
	)
}

export default Child