import dayjs from 'dayjs'
import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { commonStyles } from './commonStyles'
import { Event } from './interfaces'
import { Color } from './theme'
import { isToday } from './utils'

interface CalendarHeaderProps<T> {
  dateRange: dayjs.Dayjs[]
  cellHeight: number
  style: ViewStyle
  allDayEvents: Event<T>[]
  isRTL: boolean
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
                style={[_isToday && styles.todayWrap, _isToday && { backgroundColor: '#004A58' }]}
              >
                <Text style={[styles.dateText, _isToday && { color: '#fff' }]}>
                  {date.format('D')}
                </Text>
              </View>
            </View>
            <View style={[commonStyles.dateCell, { minHeight: 25, borderWidth: 0 }]}>
              {allDayEvents.map((event, index) => {
                if (!event.start.isSame(date, 'day')) {
                  return null
                }
                return (
                  <TouchableOpacity onPress={onPressEvent} key={index}>
                    <View
                      style={[
                        commonStyles.eventCell,
                        {
                          position: 'relative',
                          height: 20,
                          marginTop: 3,
                          backgroundColor: event.color ? event.color : '#ccc',
                        },
                      ]}
                    >
                      <Text style={commonStyles.eventTitle}>{event.title}</Text>
                    </View>
                  </TouchableOpacity>
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
