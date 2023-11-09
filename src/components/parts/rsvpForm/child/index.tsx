'use client'

import { useState } from "react";

const Child = (person) =>
{
	const { id, properties } = person
	const name = properties.Name.title[0].plain_text
	const [status, setStatus] = useState(false)

	return (
		<div>
			<label htmlFor={`name_${ id }`}>Name</label>
			<input type="text" name={`name_${ id }`} id={`name_${ id }`} defaultValue={name} required />
			<fieldset>
				<legend>Will {name} be attending?</legend>
				<div>
					<input type="radio" name={`attending_${ id }`} id={`attending_${ id }`} value="Yes" checked={status} onChange={() => setStatus(true)} />
					<label htmlFor={`attending_${ id }`}>Yes</label>
					<input type="radio" name={`attending_${ id }`} id={`attending_${ id }`} value="No" checked={!status} onChange={() => setStatus(false)} />
					<label htmlFor={`attending_${ id }`}>No</label>
				</div>
			</fieldset>

			{status && <>
				<input type="hidden" name={`child_${ id }`} value="true" />
				<label htmlFor={`age_${ id }`}>Age</label>
				<input type="text" name={`age_${ id }`} id={`age_${ id }`} required />

				<label htmlFor={`dietary_${ id }`}>Dietary requirements</label>
				<textarea name={`dietary_${ id }`} id={`dietary_${ id }`}></textarea>
			</>}
		</div>
	)
}

export default Child