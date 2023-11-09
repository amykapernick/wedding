'use client'

import { useState } from "react";

import styles from '../styles.module.css'

const mealOptions = ['Steak', 'Fish', 'Vegetarian'];

const Adult = (person) =>
{
	const { id, name, attending, dietary, meal } = person
	const [status, setStatus] = useState(attending === 'Yes')

	return (
		<div className={styles.person}>
			<fieldset className={[styles.radio, styles.short].join(' ')}>
				<legend className="sr-only">Will {name} be attending?</legend>
				<span>
					<label
						htmlFor={`name_${ id }`}
						className="sr-only"
					>
						Name
					</label>
					Will
					<input type="text" name={`name_${ id }`} id={`name_${ id }`} defaultValue={name} required />
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



			{status &&
				<>

					<span>
						<label htmlFor={`meal_${ id }`}>Meal</label>
						<select name={`meal_${ id }`} id={`meal_${ id }`} defaultValue={meal} required>
							{mealOptions.map(option => (
								<option value={option} key={option}>{option}</option>
							))}
						</select>
					</span>

					<span>
						<label htmlFor={`dietary_${ id }`}>Dietary requirements</label>
						<textarea name={`dietary_${ id }`} id={`dietary_${ id }`} defaultValue={dietary}></textarea>
					</span>
				</>
			}
		</div>
	)
}

export default Adult