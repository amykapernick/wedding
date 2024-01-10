'use client'

import { Child as ChildType } from "@ts/people";
import { useState } from "react";
import styles from '../styles.module.css'

const Child = (person: ChildType) =>
{
	const { id, name, attending, dietary, age } = person
	const [status, setStatus] = useState(attending === 'Yes')

	return (
		<div className={styles.person}>
			<span>
				<label htmlFor="first_name">First Name</label>
				<input type="text" name="first_name" id="first_name" defaultValue={name.first} required />
			</span>
			<span>
				<label htmlFor="last_name">Last Name</label>
				<input type="text" name="last_name" id="last_name" defaultValue={name.last} required />
			</span>

			<fieldset className={styles.radio}>
				<legend>Attendance</legend>
				<div>
					<span>
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
							Accept with pleasure
						</label>
					</span>
					<span>
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
							Regretfully decline
						</label>
					</span>
				</div>
			</fieldset>

			{status && <>
				<input type="hidden" name={`child_${ id }`} value="true" />
				<span><label htmlFor={`age_${ id }`}>Age</label>
					<input type="text" name={`age_${ id }`} id={`age_${ id }`} defaultValue={age} required /></span>

				<span className={styles.long}><label htmlFor={`dietary_${ id }`}>Dietary requirements</label>
					<textarea name={`dietary_${ id }`} id={`dietary_${ id }`} defaultValue={dietary}></textarea></span>
			</>}
		</div>
	)
}

export default Child