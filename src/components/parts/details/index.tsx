import { Converter } from 'showdown'
import FrameTop from '@img/frame_top.png'
import Image from 'next/image'
import Monogram from '@img/monogram.svg'
import Map from '@img/map.png'
import { ics, CalendarEvent } from 'calendar-link'

import styles from './styles.module.css'

const Content = ({ data, children }: { data: string, children: any }) =>
{
	const event: CalendarEvent = {
		title: process.env.NEXT_PUBLIC_EVENT_TITLE as string,
		description: process.env.NEXT_PUBLIC_EVENT_DESCRIPTION as string,
		start: process.env.NEXT_PUBLIC_EVENT_START as string,
		end: process.env.NEXT_PUBLIC_EVENT_END as string,
		location: process.env.NEXT_PUBLIC_EVENT_LOCATION as string,
	}

	const calendarButtons = `<span class=${ styles.buttons }><a filename="event.ics" download href="${ ics(event) }" target="_blank">Add to Calendar</a></span>`

	const pageContent = new Converter().makeHtml(data)
	const sections = pageContent.replace('{{calendar_links}}', calendarButtons).replace('{{map}}', `<img src=${ Map.src } alt="Linked Map to Location" />`).split('<hr />\n')

	return (
		<>
			<div className={styles.content}>
				<Image src={FrameTop} alt="" className={styles.frame} />
				<Monogram className={styles.monogram} />
				{sections.map(section => (
					<section className={styles.section} dangerouslySetInnerHTML={{ __html: section }} />
				))}

			</div>
			{children}
		</>
	)
}

export default Content