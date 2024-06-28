import { addHours, format } from "date-fns";
import
{
	TimelineWrapper,
	TimelineBox,
	TimelineTime,
	TimelineDivider,
	TimelineDividers,
	useTimeline
} from "planby";
import styles from './styles.module.css'

function Timeline ({
	isBaseTimeFormat,
	isSidebar,
	dayWidth,
	hourWidth,
	numberOfHoursInDay,
	offsetStartHoursRange,
	sidebarWidth,
	startDate
})
{
	const { time, dividers, formatTime } = useTimeline(
		numberOfHoursInDay,
		isBaseTimeFormat
	);

	const renderTime = (index) =>
	{
		console.log({
			index,
			startDate,
			time: addHours(startDate, index),
			format: format(addHours(startDate, index), "hh:mm aaa")
		})
		return (
			<TimelineBox key={index} width={hourWidth}>
				<TimelineTime className={styles.time}>
					{format(addHours(startDate, index), "hh:mm aaa")}
				</TimelineTime>
				<TimelineDividers className={styles.dividers}>{renderDividers()}</TimelineDividers>
			</TimelineBox>
		)
	};

	const renderDividers = () =>
		dividers.map((_, index) => (
			<TimelineDivider key={index} width={hourWidth} />
		));

	return (
		<TimelineWrapper
			className={styles.timeline}
			dayWidth={dayWidth}
			sidebarWidth={sidebarWidth}
			isSidebar={isSidebar}
		>
			{time.map((_, index) => renderTime(index))}
		</TimelineWrapper>
	);
}


export default Timeline