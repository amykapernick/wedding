import Guest from "@parts/guest";
import { Client } from '@notionhq/client'
import { currentUser } from '@clerk/nextjs';
import type { NotionPerson, NotionGuest } from "@ts/people";
import type { User } from "@clerk/nextjs/server";
// import Calendar from '@img/icons/calendar.svg'
import { Converter } from 'showdown'

const Content = ({ data }: { data: string }) =>
{
	const convertTime = (date: string) => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d\d\d/, '')
	const eventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${ encodeURIComponent(process.env.NEXT_PUBLIC_EVENT_TITLE) }&details=${ encodeURIComponent(process.env.NEXT_PUBLIC_EVENT_DESCRIPTION) }&location=${ process.env.NEXT_PUBLIC_EVENT_LOCATION }&dates=${ convertTime(process.env.NEXT_PUBLIC_EVENT_START) }%2F${ convertTime(process.env.NEXT_PUBLIC_EVENT_END) }`

	return (
		<>
			<h1>Content</h1>
			<a
				href={eventUrl}
				target="_blank"
				className="btn"
			>
				{/* <Calendar /> */}
				<span>Add to Google Calendar</span>
			</a>
			<div dangerouslySetInnerHTML={{ __html: new Converter().makeHtml(data) }} />
		</>
	)
}

export default Content