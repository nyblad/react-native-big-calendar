import dayjs from 'dayjs'
import * as React from 'react'
import { ViewStyle } from 'react-native'
import { DayJSConvertedEvent, Event } from './interfaces'
interface CalendarHeaderProps<T> {
  dateRange: dayjs.Dayjs[]
  cellHeight: number
  style: ViewStyle
  allDayEvents: DayJSConvertedEvent[]
  isRTL: boolean
  showTime: boolean
  onPressDateHeader?: (date: Date) => void
  onPressEvent?: (event: Event<T>) => void
}
export declare const CalendarHeader: React.MemoExoticComponent<typeof _CalendarHeader>
export declare function _CalendarHeader({
  dateRange,
  cellHeight,
  style,
  allDayEvents,
  isRTL,
  onPressDateHeader,
  onPressEvent,
  showTime,
}: CalendarHeaderProps<any>): JSX.Element
export {}
