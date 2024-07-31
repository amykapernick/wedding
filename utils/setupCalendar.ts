import { DateLocalizer, EventProps, View, Views, dateFnsLocalizer } from 'react-big-calendar'
import enAU from 'date-fns/locale/en-AU'
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ComponentType } from 'react';
import { RunsheetEvent } from '@ts/runsheet';
import { Event, EventWrapper } from '@components/calendarEvent';
import CustomWeekView from '@components/calendarView';

export const locales = {
	'en-AU': enAU,
}

export const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
	getDay,
	locales: locales,
})

type DateRangeFormatFunction = (range: { start: Date, end: Date }, culture: string | null, localizer: DateLocalizer) => string

type DateFormatFunction = (date: Date, culture: string | null, localizer: DateLocalizer) => string

export const dateFormats: Record<string, (DateRangeFormatFunction | DateFormatFunction)> = {
	dayRangeHeaderFormat: ({ start, end }: { start: Date, end: Date }, culture: string | null, localizer: DateLocalizer) =>
	{
		if (!end)
		{
			return localizer.format(start, 'dd MMM')
		}

		if (start.getMonth() === end.getMonth())
		{
			return `${ localizer.format(start, 'dd') } - ${ localizer.format(end, 'dd MMM') }`
		}

		return `${ localizer.format(start, 'dd MMM') } - ${ localizer.format(end, 'dd MMM') }`
	},
	dayHeaderFormat: (date: Date, culture: string | null, localizer: DateLocalizer) => localizer.format(date, 'dd MMM'),
	agendaDateFormat: (date: Date, culture: string | null, localizer: DateLocalizer) => localizer.format(date, 'dd MMM'),
	agendaHeaderFormat: ({ start, end }: { start: Date, end: Date }, culture: string | null, localizer: DateLocalizer) =>
	{
		if (!end)
		{
			return localizer.format(start, 'dd MMM')
		}

		if (start.getMonth() === end.getMonth())
		{
			return `${ localizer.format(start, 'dd') } - ${ localizer.format(end, 'dd MMM') }`
		}

		return `${ localizer.format(start, 'dd MMM') } - ${ localizer.format(end, 'dd MMM') }`
	},
	timeGutterFormat: (date: Date, culture: string | null, localizer: DateLocalizer) => localizer.format(date, 'hh:mm aaa'),
}

const defaultAccessors: Record<string, (string | ((event: Event) => void))> = {
	start: 'start',
	end: 'end',
}

export const customComponents: Record<string, ComponentType<EventProps<RunsheetEvent>>> = {
	event: Event,
	eventWrapper: EventWrapper
}

export const accessors = () =>
{
	const items: Record<string, (string | ((event: RunsheetEvent) => void))> = {}

	Object.entries(defaultAccessors).map(([key, value]) =>
	{
		items[`${ key }Accessor`] = value
	})

	return items
}

export const views: {
	default: View,
	options: Record<View, any>
} = {
	default: Views.WEEK,
	options: {
		day: true,
		week: CustomWeekView,
		agenda: true,
		month: undefined,
		work_week: undefined
	}
}