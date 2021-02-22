import * as React from 'react'
import { ViewStyle } from 'react-native'
import { DateRangeHandler, Event, EventCellStyle, Mode, WeekNum } from './interfaces'
interface CalendarProps<T> {
  events: Event<T>[]
  height: number
  overlapOffset?: number
  ampm?: boolean
  date?: Date
  eventCellStyle?: EventCellStyle<T>
  locale?: string
  hideNowIndicator?: boolean
  mode?: Mode
  scrollOffsetMinutes?: number
  showTime?: boolean
  style?: ViewStyle
  swipeEnabled?: boolean
  weekStartsOn?: WeekNum
  isRTL?: boolean
  onChangeDate?: DateRangeHandler
  onPressCell?: (date: Date) => void
  onPressDateHeader?: (date: Date) => void
  onPressEvent?: (event: Event<T>) => void
}
export declare function _Calendar<T>({
  events,
  height,
  ampm,
  date,
  eventCellStyle,
  locale,
  hideNowIndicator,
  mode,
  overlapOffset,
  scrollOffsetMinutes,
  showTime,
  style,
  swipeEnabled,
  weekStartsOn,
  isRTL,
  onChangeDate,
  onPressCell,
  onPressDateHeader,
  onPressEvent,
}: CalendarProps<T>): JSX.Element
export declare const Calendar: React.MemoExoticComponent<typeof _Calendar>
export {}
