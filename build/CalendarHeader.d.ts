import dayjs from 'dayjs'
import * as React from 'react'
import { ViewStyle } from 'react-native'
import { Event } from './interfaces'
interface CalendarHeaderProps<T> {
  dateRange: dayjs.Dayjs[]
  cellHeight: number
  style: ViewStyle
  allDayEvents: Event<T>[]
  isRTL: boolean
  onPressDateHeader?: (date: Date) => void
}
export declare const CalendarHeader: React.MemoExoticComponent<typeof _CalendarHeader>
export declare function _CalendarHeader({
  dateRange,
  cellHeight,
  style,
  allDayEvents,
  isRTL,
  onPressDateHeader,
}: CalendarHeaderProps<any>): JSX.Element
export {}
