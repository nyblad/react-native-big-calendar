import dayjs from 'dayjs'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { CalendarEvent } from './CalendarEvent'
import { commonStyles } from './commonStyles'
import { DayJSConvertedEvent, Event } from './interfaces'
import { Color } from './theme'
import { isToday } from './utils'

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

export const CalendarHeader = React.memo(_CalendarHeader)

export function _CalendarHeader({
  dateRange,
  cellHeight,
  style = {},
  allDayEvents,
  isRTL,
  onPressDateHeader,
  onPressEvent,
  showTime,
}: CalendarHeaderProps<any>) {
  const _onPress = React.useCallback(
    (date: Date) => {
      onPressDateHeader && onPressDateHeader(date)
    },
    [onPressDateHeader],
  )

  return (
    <View style={[isRTL ? styles.containerRTL : styles.container, style]}>
      <View style={[commonStyles.hourGuide, styles.hourGuideSpacer]} />
      {dateRange.map((date) => {
        const _isToday = isToday(date)
        return (
          <TouchableOpacity
            style={{ flex: 1, paddingTop: 2 }}
            onPress={() => _onPress(date.toDate())}
            disabled={onPressDateHeader === undefined}
            key={date.toString()}
          >
            <View style={{ minHeight: cellHeight, justifyContent: 'space-between' }}>
              <Text style={[commonStyles.guideText, _isToday && { color: '#004A58' }]}>
                {date.format('ddd')}
              </Text>
              <View
                style={[
                  _isToday && styles.todayWrap,
                  _isToday && { backgroundColor: '#004A58', marginTop: 8 },
                ]}
              >
                <Text style={[styles.dateText, _isToday && { color: '#fff' }]}>
                  {date.format('D')}
                </Text>
              </View>
            </View>
            <View style={[commonStyles.dateCell, { minHeight: 25, borderWidth: 0 }]}>
              {allDayEvents.map((event) => {
                if (!event.start.isSame(date, 'day')) {
                  return null
                }
                return (
                  <CalendarEvent
                    key={event.id}
                    event={event}
                    onPressEvent={onPressEvent}
                    eventCellStyle={(event) => ({
                      position: 'relative',
                      height: 20,
                      marginTop: 2,
                      marginBottom: 1,
                      backgroundColor: event.color ? event.color : '#ccc',
                    })}
                    showTime={showTime}
                  />
                )
              })}
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  containerRTL: {
    flexDirection: 'row-reverse',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  dateText: {
    color: '#444',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 6,
  },
  todayWrap: {
    backgroundColor: Color.primary,
    width: 36,
    height: 36,
    borderRadius: 50,
    marginTop: 6,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  hourGuideSpacer: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
})
