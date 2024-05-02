'use client'

import { NotionRunsheetEvent, RunsheetEvent, NotionStakeholder } from "@ts/runsheet"
import { parseISO } from "date-fns"
import { ChannelBox, ChannelLogo, Epg, Layout, useEpg } from "planby"
import { useCallback, useEffect, useMemo, useState } from "react"
import theme from './theme'
import ProgramItem from "./programItem"
import Timeline from './timeline'
import styles from './styles.module.css'

type ScheduleProps = {
	people: any[]
	start: string
	end: string
}

const Schedule = (props: ScheduleProps) =>
{
	const { start, end } = props
	const [channels, setChannels] = useState([]);
	const [epg, setEpg] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const height = 200


	const people = useMemo(() => channels, [channels])
	const events = useMemo(() => epg, [epg])

	const { getEpgProps, getLayoutProps } = useEpg({
		channels: people,
		epg: events,
		height: (props.people.length * height) + 100,
		itemHeight: height,
		dayWidth: 20000,
		isSidebar: true,
		isTimeline: true,
		isLine: false,
		startDate: start,
		endDate: end,
		isBaseTimeFormat: true,
		theme: theme,
		overlap: 'stack'
	})

	const handleFetchResources = useCallback(async () =>
	{
		setIsLoading(true);
		const programs = []
		const channels = props.people.map(({ uuid, title, events }) =>
		{
			events.forEach((event) =>
			{
				programs.push({
					channelUuid: uuid,
					since: event.start,
					till: event.end,
					title: event.name,
					description: event.notes
				})
			})

			return ({
				uuid,
				title
			})
		})

		console.log({ programs })


		setEpg(programs);
		setChannels(channels);
		setIsLoading(false);
	}, []);

	useEffect(() =>
	{
		handleFetchResources();
		console.log({ epg })
	}, [handleFetchResources]);

	console.log({ epg, events })

	return (
		<div>
			<Epg isLoading={isLoading} {...getEpgProps()}>
				<Layout
					{...getLayoutProps()}
					renderTimeline={(props) => <Timeline startDate={start} {...props} />}
					renderChannel={({ channel }) => (
						<ChannelBox key={channel.uuid} className={styles.person} {...channel.position}>
							<span>{channel.title}</span>
						</ChannelBox>
					)}
					renderProgram={({ program, ...rest }) => (
						<ProgramItem key={program.data.id} program={program} {...rest} />
					)}
				/>
			</Epg>
		</div>
	)
}

export default Schedule

