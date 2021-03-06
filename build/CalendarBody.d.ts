import dayjs from 'dayjs'
import * as React from 'react'
import { ViewStyle } from 'react-native'
import { DayJSConvertedEvent, Event, EventCellStyle, HorizontalDirection } from './interfaces'
interface CalendarBodyProps<T> {
  cellHeight: number
  containerHeight: number
  dateRange: dayjs.Dayjs[]
  dayJsConvertedEvents: DayJSConvertedEvent[]
  scrollOffsetMinutes: number
  ampm: boolean
  showTime: boolean
  style: ViewStyle
  eventCellStyle?: EventCellStyle<T>
  hideNowIndicator?: boolean
  overlapOffset?: number
  isRTL: boolean
  onPressCell?: (date: Date) => void
  onPressEvent?: (event: Event<T>) => void
  onSwipeHorizontal?: (d: HorizontalDirection) => void
}
export declare const CalendarBody: React.NamedExoticComponent<CalendarBodyProps<any>>
export declare function _CalendarBody({
  containerHeight,
  cellHeight,
  dateRange,
  style,
  onPressCell,
  dayJsConvertedEvents,
  onPressEvent,
  eventCellStyle,
  ampm,
  showTime,
  scrollOffsetMinutes,
  onSwipeHorizontal,
  hideNowIndicator,
  overlapOffset,
  isRTL,
}: CalendarBodyProps<{}>): JSX.Element
export {}
