import { useState } from "react";

import styles from '../styles.module.css'

const mealOptions = ['Steak', 'Fish', 'Vegetarian'];

const Adult = (person) => {
	const {id, properties} = person
	const name = properties.Name.title[0].plain_text
	const [status, setStatus] = useState(false)

	return (
			<div className={styles.person}>
					<fieldset className={[styles.radio, styles.short].join(' ')}>
						<legend>Will {name} be attending?</legend>
						<div>
							<input 
								type="radio" 
								name={`attending_${id}`} 
								id={`attending_${id}_yes`} 
								value="Yes" 
								checked={status} 
								onChange={() => setStatus(true)} 
							/>
							<label 
								htmlFor={`attending_${id}_yes`}
							>
								Yes
							</label>
							<input 
								type="radio" 
								name={`attending_${id}`} 
								id={`attending_${id}_no`} 
								value="No" 
								checked={!status} 
								onChange={() => setStatus(false)} 
							/>
							<label 
								htmlFor={`attending_${id}_no`}
							>
								No
							</label>
						</div>
					</fieldset>

				{status && 
					<>
						<span>
							<label 
								htmlFor={`name_${id}`}
							>
								Name
							</label>
							<input type="text" name={`name_${id}`} id={`name_${id}`} defaultValue={name} required />
						</span>
						<span>
							<label htmlFor={`meal_adult_${id}`}>Meal</label>
							<select name={`meal_adult_${id}`} id={`meal_adult_${id}`} required>
								{mealOptions.map(option => (
									<option value={option} key={option}>{option}</option>
								))}
							</select>
						</span>
				
						<span>
							<label htmlFor={`dietary_adult_${id}`}>Dietary requirements</label>
							<textarea name={`dietary_adult_${id}`} id={`dietary_adult_${id}`}></textarea>
						</span>
					</>
				}
			</div>
	)
}

export default Adult