import { useMemo } from 'react'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import { DateLocalizer, Navigate } from 'react-big-calendar'

type CustomViewProps = {
	date: Date
	localizer: any
	max?: Date
	min?: Date
	scrollToTime?: Date
}

const CustomWeekView = (props: CustomViewProps) =>
{
	const {
		date,
		localizer,
		max = localizer.endOf(new Date(), 'day'),
		min = localizer.startOf(new Date(), 'day'),
		scrollToTime = localizer.startOf(new Date(), 'day'),
		...args
	} = props
	
	const currRange = useMemo(
		() => CustomWeekView.range(
			date, 
			{ localizer }
		),
		[date, localizer]
	)

	return (
		<TimeGrid
			{...args }
			date={ date }
			eventOffset ={ 15}
			localizer={ localizer }
			max={ max }
			min={ min }
			range={ currRange }
			scrollToTime={ scrollToTime }
		/>
	)
  }

  type CustomViewRangeProps = [
	Date, 
	{ 
		localizer: DateLocalizer & {
			dayRange?: number
		} 
	}
]

  CustomWeekView.range = (...props: CustomViewRangeProps) =>
	{
		const [date, { localizer }] = props
		const start = date
		const end = localizer.add(start, (localizer?.dayRange || 3) - 1, 'day')
	
		let current = start
		const range = []
	
		while (localizer.lte(current, end, 'day'))
		{
			range.push(current)
			current = localizer.add(current, 1, 'day')
		}
	
		return range
	}

	type CustomViewNavigateProps = [
		Date, 
		'PREV' | 'NEXT' | 'DATE', 
		{ 
			localizer: DateLocalizer & {
				dayRange?: number
			}
		}
	]
	
	CustomWeekView.navigate = (...props: CustomViewNavigateProps) =>
	{
		const [ date, action, { localizer } ] = props

		switch (action)
		{
			case Navigate.PREVIOUS:
				return localizer.add(date, -1 * (localizer?.dayRange || 3), 'day')
	
			case Navigate.NEXT:
				return localizer.add(date, (localizer?.dayRange || 3), 'day')
	
			default:
				return date
		}
	}
	
	CustomWeekView.title = (date, { localizer }) =>
	{
		const [start, ...rest] = CustomWeekView.range(date, { localizer })

		return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
	}

  export default CustomWeekView