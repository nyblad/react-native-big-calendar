import * as React from 'react'
import { DayJSConvertedEvent, Event, EventCellStyle } from './interfaces'
interface CalendarBodyProps<T> {
  event: DayJSConvertedEvent
  onPressEvent?: (event: Event<T>) => void
  eventCellStyle?: EventCellStyle<T>
  showTime: boolean
  eventCount?: number
  eventOrder?: number
  overlapOffset?: number
}
export declare const CalendarEvent: React.MemoExoticComponent<typeof _CalendarEvent>
export declare function _CalendarEvent({
  event,
  onPressEvent,
  eventCellStyle,
  showTime,
  eventCount,
  eventOrder,
  overlapOffset,
}: CalendarBodyProps<{}>): JSX.Element
export {}
