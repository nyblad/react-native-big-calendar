import dayjs from 'dayjs'
import React from 'react'
import { ViewStyle } from 'react-native'
export interface BaseEvent {
  id: number
  start: Date
  end: Date
  title: string
  color?: string
}
export interface DayJSConvertedEvent {
  id: number
  start: dayjs.Dayjs
  end: dayjs.Dayjs
  title: string
  children?: React.ReactNode
}
export declare type Event<T = {}> = BaseEvent & T
export declare type Mode = '3days' | 'week' | 'day'
export declare type EventCellStyle<T> = ViewStyle | ((event: Event<T>) => ViewStyle)
export declare type WeekNum = 0 | 1 | 2 | 3 | 4 | 5 | 6
export declare type HasDateRange = [Date, Date]
export declare type DateRangeHandler = ([start, end]: HasDateRange) => void
export declare type HorizontalDirection = 'RIGHT' | 'LEFT'
