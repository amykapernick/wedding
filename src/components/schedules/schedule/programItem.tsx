import
{
	ProgramBox,
	ProgramContent,
	ProgramFlex,
	ProgramStack,
	ProgramTitle,
	ProgramText,
	ProgramImage,
	useProgram
} from "planby";
import styles from './styles.module.css'

const ProgramItem = ({ program, ...rest }) =>
{
	const {
		styles: programStyles,
		formatTime,
		set12HoursTimeFormat,
		isLive,
		isMinWidth,
		...args
	} = useProgram({
		program,
		...rest
	});

	const { data } = program;
	const { image, title, since, till, description } = data;

	const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
	const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

	return (
		<ProgramBox
			width={programStyles.width}
			style={programStyles.position}
			className={styles.event}
		>
			<ProgramContent width={programStyles.width} isLive={isLive} className={styles.wrapper}>
				<ProgramFlex className={styles.container}>
					{isLive && isMinWidth && <ProgramImage src={image} alt="Preview" />}
					<ProgramStack className={styles.container}>
						<ProgramTitle className={styles.title}>{title}</ProgramTitle>
						<span>{description}</span>
						<ProgramText>
							{sinceTime} - {tillTime}
						</ProgramText>
					</ProgramStack>
				</ProgramFlex>
			</ProgramContent>
		</ProgramBox>
	);
};


export default ProgramItem