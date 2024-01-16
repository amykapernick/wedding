'use client'

import { useState } from "react";
import type { Adult as AdultType, MealOptions } from '@ts/people'
import styles from '../styles.module.css'

const mealOptions: MealOptions[] = ['Steak', 'Fish', 'Vegetarian'];

const Adult = (person: AdultType) =>
{
	const { id, name, attending, dietary, meal } = person
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



			{status &&
				<>
					<span className={styles.long}>
						<label htmlFor={`dietary_${ id }`}>Dietary requirements</label>
						<textarea name={`dietary_${ id }`} id={`dietary_${ id }`} defaultValue={dietary}></textarea>
					</span>
				</>
			}
		</div>
	)
}

export default Adult