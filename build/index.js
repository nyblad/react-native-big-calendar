'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var dayjs = require('dayjs')
var React = require('react')
var isBetween = require('dayjs/plugin/isBetween')
var reactNative = require('react-native')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

var dayjs__default = /*#__PURE__*/ _interopDefaultLegacy(dayjs)
var isBetween__default = /*#__PURE__*/ _interopDefaultLegacy(isBetween)

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i]
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
      }
      return t
    }
  return __assign.apply(this, arguments)
}

var Color
;(function (Color) {
  Color['primary'] = 'rgb(66, 133, 244)'
  Color['red'] = '#C80B22'
  Color['yellow'] = '#F8E71C'
  Color['green'] = '#4AC001'
  Color['orange'] = '#E26245'
  Color['pink'] = '#5934C7'
})(Color || (Color = {}))

var MIN_HEIGHT = 1200
var HOUR_GUIDE_WIDTH = 50
var OVERLAP_OFFSET = reactNative.Platform.OS === 'web' ? 20 : 8
var OVERLAP_PADDING = reactNative.Platform.OS === 'web' ? 3 : 0
var commonStyles = reactNative.StyleSheet.create({
  dateCell: {
    borderWidth: 1,
    borderColor: '#eee',
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  guideText: {
    color: '#888',
    fontSize: 11,
    textAlign: 'center',
  },
  hourGuide: {
    backgroundColor: '#fff',
    zIndex: 1000,
    width: HOUR_GUIDE_WIDTH,
  },
  eventCell: {
    position: 'absolute',
    backgroundColor: Color.primary,
    zIndex: 100,
    start: 3,
    end: 3,
    borderRadius: 3,
    padding: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    minWidth: '33%',
  },
  eventTitle: {
    color: '#fff',
    fontSize: 12,
  },
})

var DAY_MINUTES = 1440
function getDatesInWeek(date, weekStartsOn, locale) {
  if (date === void 0) {
    date = new Date()
  }
  if (weekStartsOn === void 0) {
    weekStartsOn = 0
  }
  if (locale === void 0) {
    locale = 'en'
  }
  var subject = dayjs__default['default'](date)
  var subjectDOW = subject.day()
  var days = Array(7)
    .fill(0)
    .map(function (_, i) {
      return subject.add(i - subjectDOW + weekStartsOn, 'day').locale(locale)
    })
  return days
}
function getDatesInNextThreeDays(date, locale) {
  if (date === void 0) {
    date = new Date()
  }
  if (locale === void 0) {
    locale = 'en'
  }
  var subject = dayjs__default['default'](date).locale(locale)
  var days = Array(3)
    .fill(0)
    .map(function (_, i) {
      return subject.add(i, 'day')
    })
  return days
}
function getDatesInNextOneDay(date, locale) {
  if (date === void 0) {
    date = new Date()
  }
  if (locale === void 0) {
    locale = 'en'
  }
  var subject = dayjs__default['default'](date).locale(locale)
  var days = Array(1)
    .fill(0)
    .map(function (_, i) {
      return subject.add(i, 'day')
    })
  return days
}
var hours = Array(24)
  .fill(0)
  .map(function (_, i) {
    return i
  })
function formatHour(hour, ampm) {
  if (ampm === void 0) {
    ampm = false
  }
  if (ampm) {
    if (hour === 0) {
      return ''
    }
    if (hour === 12) {
      return '12 PM'
    }
    if (hour > 12) {
      return hour - 12 + ' PM'
    }
    return hour + ' AM'
  }
  return hour + ':00'
}
function isToday(date) {
  var today = dayjs__default['default']()
  return today.isSame(date, 'day')
}
function getRelativeTopInDay(date) {
  if (date === void 0) {
    date = dayjs__default['default']()
  }
  return (100 * (date.hour() * 60 + date.minute())) / DAY_MINUTES
}
function modeToNum(mode) {
  switch (mode) {
    case '3days':
      return 3
    case 'week':
      return 7
    case 'day':
      return 1
    default:
      throw new Error('undefined mode')
  }
}
function formatStartEnd(event) {
  return event.start.format('HH:mm') + ' - ' + event.end.format('HH:mm')
}
function isAllDayEvent(event) {
  return (
    event.start.hour() === 0 &&
    event.start.minute() === 0 &&
    event.end.hour() === 0 &&
    event.end.minute() === 0
  )
}
function getCountOfEventsAtEvent(event, eventList) {
  dayjs__default['default'].extend(isBetween__default['default'])
  return eventList.filter(function (e) {
    return (
      event.start.isBetween(e.start, e.end, 'minute', '[)') ||
      e.start.isBetween(event.start, event.end, 'minute', '[)')
    )
  }).length
}
function getOrderOfEvent(event, eventList) {
  dayjs__default['default'].extend(isBetween__default['default'])
  var events = eventList
    .filter(function (e) {
      return (
        event.start.isBetween(e.start, e.end, 'minute', '[)') ||
        e.start.isBetween(event.start, event.end, 'minute', '[)')
      )
    })
    .sort(function (a, b) {
      if (a.start.isSame(b.start)) {
        return a.start.diff(a.end) < b.start.diff(b.end) ? -1 : 1
      } else {
        return a.start.isBefore(b.start) ? -1 : 1
      }
    })
  return events.indexOf(event)
}
function getColorForEventPosition(eventPosition) {
  switch (eventPosition % 5) {
    case 0:
      return Color.primary
    case 1:
      return Color.orange
    case 2:
      return Color.green
    case 3:
      return Color.red
    case 4:
      return Color.pink
    default:
      return Color.primary
  }
}
function getStyleForOverlappingEvent(eventCount, eventPosition, overlapOffset) {
  var overlapStyle = {}
  if (eventCount > 1) {
    var offset = overlapOffset
    var start = eventPosition * offset
    var zIndex = 100 + eventPosition
    overlapStyle = {
      start: start + OVERLAP_PADDING,
      end: OVERLAP_PADDING,
      backgroundColor: getColorForEventPosition(eventPosition),
      zIndex: zIndex,
    }
  }
  return overlapStyle
}

function getEventCellPositionStyle(_a) {
  var end = _a.end,
    start = _a.start
  var relativeHeight = 100 * (1 / DAY_MINUTES) * end.diff(start, 'minute')
  var relativeTop = getRelativeTopInDay(start)
  return {
    height: relativeHeight + '%',
    top: relativeTop + '%',
  }
}
var CalendarEvent = React.memo(_CalendarEvent)
function _CalendarEvent(_a) {
  var event = _a.event,
    onPressEvent = _a.onPressEvent,
    eventCellStyle = _a.eventCellStyle,
    showTime = _a.showTime,
    _b = _a.eventCount,
    eventCount = _b === void 0 ? 1 : _b,
    _c = _a.eventOrder,
    eventOrder = _c === void 0 ? 0 : _c,
    _d = _a.overlapOffset,
    overlapOffset = _d === void 0 ? OVERLAP_OFFSET : _d
  var getEventStyle = React.useMemo(
    function () {
      return typeof eventCellStyle === 'function'
        ? eventCellStyle
        : function (_) {
            return eventCellStyle
          }
    },
    [eventCellStyle],
  )
  var plainJsEvent = React.useMemo(
    function () {
      return __assign(__assign({}, event), { start: event.start.toDate(), end: event.end.toDate() })
    },
    [event],
  )
  var _onPress = React.useCallback(
    function () {
      onPressEvent && onPressEvent(plainJsEvent)
    },
    [onPressEvent, plainJsEvent],
  )
  return React.createElement(
    reactNative.TouchableOpacity,
    {
      delayPressIn: 20,
      key: event.id,
      style: [
        commonStyles.eventCell,
        getEventCellPositionStyle(event),
        getStyleForOverlappingEvent(eventCount, eventOrder, overlapOffset),
        getEventStyle(plainJsEvent),
      ],
      onPress: _onPress,
      disabled: !onPressEvent,
    },
    event.end.diff(event.start, 'minute') < 32 && showTime
      ? React.createElement(
          reactNative.Text,
          { style: commonStyles.eventTitle },
          event.title,
          ',',
          React.createElement(
            reactNative.Text,
            { style: styles.eventTime },
            event.start.format('HH:mm'),
          ),
        )
      : React.createElement(
          React.Fragment,
          null,
          React.createElement(reactNative.Text, { style: commonStyles.eventTitle }, event.title),
          showTime &&
            React.createElement(
              reactNative.Text,
              { style: styles.eventTime },
              formatStartEnd(event),
            ),
          event.children && event.children,
        ),
  )
}
var styles = reactNative.StyleSheet.create({
  eventTime: {
    color: '#fff',
    fontSize: 10,
  },
})

dayjs__default['default'].extend(isBetween__default['default'])
var SWIPE_THRESHOLD = 50
var HourGuideColumn = React.memo(
  function (_a) {
    var cellHeight = _a.cellHeight,
      hour = _a.hour,
      ampm = _a.ampm
    return React.createElement(
      reactNative.View,
      { style: { height: cellHeight } },
      React.createElement(
        reactNative.Text,
        { style: commonStyles.guideText },
        formatHour(hour, ampm),
      ),
    )
  },
  function () {
    return true
  },
)
function HourCell(_a) {
  var cellHeight = _a.cellHeight,
    onPress = _a.onPress,
    date = _a.date,
    hour = _a.hour
  return React.createElement(
    reactNative.TouchableWithoutFeedback,
    {
      onPress: function () {
        return onPress(date.hour(hour).minute(0))
      },
    },
    React.createElement(reactNative.View, {
      style: [commonStyles.dateCell, { height: cellHeight }],
    }),
  )
}
var CalendarBody = React.memo(_CalendarBody)
function _CalendarBody(_a) {
  var containerHeight = _a.containerHeight,
    cellHeight = _a.cellHeight,
    dateRange = _a.dateRange,
    _b = _a.style,
    style = _b === void 0 ? {} : _b,
    onPressCell = _a.onPressCell,
    dayJsConvertedEvents = _a.dayJsConvertedEvents,
    onPressEvent = _a.onPressEvent,
    eventCellStyle = _a.eventCellStyle,
    ampm = _a.ampm,
    showTime = _a.showTime,
    scrollOffsetMinutes = _a.scrollOffsetMinutes,
    onSwipeHorizontal = _a.onSwipeHorizontal,
    hideNowIndicator = _a.hideNowIndicator,
    overlapOffset = _a.overlapOffset,
    isRTL = _a.isRTL
  var scrollView = React.useRef(null)
  var _c = React.useState(dayjs__default['default']()),
    now = _c[0],
    setNow = _c[1]
  var _d = React.useState(false),
    panHandled = _d[0],
    setPanHandled = _d[1]
  React.useEffect(
    function () {
      if (scrollView.current && scrollOffsetMinutes) {
        setTimeout(
          function () {
            scrollView.current.scrollTo({
              y: (cellHeight * scrollOffsetMinutes) / 60,
              animated: false,
            })
          },
          reactNative.Platform.OS === 'web' ? 0 : 10,
        )
      }
    },
    [scrollView.current],
  )
  React.useEffect(function () {
    var pid = setInterval(function () {
      return setNow(dayjs__default['default']())
    }, 2 * 60 * 1000)
    return function () {
      return clearInterval(pid)
    }
  }, [])
  var panResponder = React.useMemo(
    function () {
      return reactNative.PanResponder.create({
        onMoveShouldSetPanResponder: function (_, _a) {
          var dx = _a.dx,
            dy = _a.dy
          return dx > 50 || dx < -50 || dy > 2 || dy < -2
        },
        onPanResponderMove: function (_, _a) {
          var dy = _a.dy,
            dx = _a.dx
          if (dy < -1 * SWIPE_THRESHOLD || SWIPE_THRESHOLD < dy || panHandled) {
            return
          }
          if (dx < -1 * SWIPE_THRESHOLD) {
            onSwipeHorizontal && onSwipeHorizontal('LEFT')
            setPanHandled(true)
            return
          }
          if (dx > SWIPE_THRESHOLD) {
            onSwipeHorizontal && onSwipeHorizontal('RIGHT')
            setPanHandled(true)
            return
          }
        },
        onPanResponderEnd: function () {
          setPanHandled(false)
        },
      })
    },
    [panHandled, onSwipeHorizontal],
  )
  var _onPressCell = React.useCallback(
    function (date) {
      onPressCell && onPressCell(date.toDate())
    },
    [onPressCell],
  )
  return React.createElement(
    reactNative.ScrollView,
    __assign(
      {
        style: [
          {
            height: containerHeight - cellHeight * 3,
          },
          style,
        ],
        ref: scrollView,
        scrollEventThrottle: 32,
        scrollEnabled: !panHandled,
      },
      reactNative.Platform.OS !== 'web' ? panResponder.panHandlers : {},
      { showsVerticalScrollIndicator: false, nestedScrollEnabled: true },
    ),
    React.createElement(
      reactNative.View,
      __assign(
        { style: isRTL ? [styles$1.bodyRTL] : [styles$1.body] },
        reactNative.Platform.OS === 'web' ? panResponder.panHandlers : {},
      ),
      React.createElement(
        reactNative.View,
        { style: [commonStyles.hourGuide] },
        hours.map(function (hour) {
          return React.createElement(HourGuideColumn, {
            key: hour,
            cellHeight: cellHeight,
            hour: hour,
            ampm: ampm,
          })
        }),
      ),
      dateRange.map(function (date) {
        return React.createElement(
          reactNative.View,
          { style: styles$1.dayContainer, key: date.toString() },
          hours.map(function (hour) {
            return React.createElement(HourCell, {
              key: hour,
              cellHeight: cellHeight,
              date: date,
              hour: hour,
              onPress: _onPressCell,
            })
          }),
          dayJsConvertedEvents
            .filter(function (_a) {
              var start = _a.start
              return start.isBetween(date.startOf('day'), date.endOf('day'), null, '[)')
            })
            .map(function (event) {
              return React.createElement(CalendarEvent, {
                key: event.id,
                event: event,
                onPressEvent: onPressEvent,
                eventCellStyle: eventCellStyle,
                showTime: showTime,
                eventCount: getCountOfEventsAtEvent(event, dayJsConvertedEvents),
                eventOrder: getOrderOfEvent(event, dayJsConvertedEvents),
                overlapOffset: overlapOffset,
              })
            }),
          isToday(date) &&
            !hideNowIndicator &&
            React.createElement(reactNative.View, {
              style: [styles$1.nowIndicator, { top: getRelativeTopInDay(now) + '%' }],
            }),
        )
      }),
    ),
  )
}
var styles$1 = reactNative.StyleSheet.create({
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  bodyRTL: {
    flexDirection: 'row-reverse',
    flex: 1,
  },
  nowIndicator: {
    position: 'absolute',
    zIndex: 10000,
    backgroundColor: 'red',
    height: 2,
    width: '100%',
  },
  dayContainer: {
    flex: 1,
    overflow: 'hidden',
  },
})

var CalendarHeader = React.memo(_CalendarHeader)
function _CalendarHeader(_a) {
  var dateRange = _a.dateRange,
    cellHeight = _a.cellHeight,
    _b = _a.style,
    style = _b === void 0 ? {} : _b,
    allDayEvents = _a.allDayEvents,
    isRTL = _a.isRTL,
    onPressDateHeader = _a.onPressDateHeader,
    onPressEvent = _a.onPressEvent,
    showTime = _a.showTime
  var _onPress = React.useCallback(
    function (date) {
      onPressDateHeader && onPressDateHeader(date)
    },
    [onPressDateHeader],
  )
  return React.createElement(
    reactNative.View,
    { style: [isRTL ? styles$2.containerRTL : styles$2.container, style] },
    React.createElement(reactNative.View, {
      style: [commonStyles.hourGuide, styles$2.hourGuideSpacer],
    }),
    dateRange.map(function (date) {
      var _isToday = isToday(date)
      return React.createElement(
        reactNative.TouchableOpacity,
        {
          style: { flex: 1, paddingTop: 2 },
          onPress: function () {
            return _onPress(date.toDate())
          },
          disabled: onPressDateHeader === undefined,
          key: date.toString(),
        },
        React.createElement(
          reactNative.View,
          { style: { minHeight: cellHeight, justifyContent: 'space-between' } },
          React.createElement(
            reactNative.Text,
            { style: [commonStyles.guideText, _isToday && { color: '#004A58' }] },
            date.format('ddd'),
          ),
          React.createElement(
            reactNative.View,
            {
              style: [
                _isToday && styles$2.todayWrap,
                _isToday && { backgroundColor: '#004A58', marginTop: 8 },
              ],
            },
            React.createElement(
              reactNative.Text,
              { style: [styles$2.dateText, _isToday && { color: '#fff' }] },
              date.format('D'),
            ),
          ),
        ),
        React.createElement(
          reactNative.View,
          { style: [commonStyles.dateCell, { minHeight: 25, borderWidth: 0 }] },
          allDayEvents.map(function (event) {
            if (!event.start.isSame(date, 'day')) {
              return null
            }
            return React.createElement(CalendarEvent, {
              key: event.id,
              event: event,
              onPressEvent: onPressEvent,
              eventCellStyle: function (event) {
                return {
                  position: 'relative',
                  height: 20,
                  marginTop: 2,
                  marginBottom: 1,
                  backgroundColor: event.color ? event.color : '#ccc',
                }
              },
              showTime: showTime,
            })
          }),
        ),
      )
    }),
  )
}
var styles$2 = reactNative.StyleSheet.create({
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

function _Calendar(_a) {
  var events = _a.events,
    height = _a.height,
    _b = _a.ampm,
    ampm = _b === void 0 ? false : _b,
    date = _a.date,
    eventCellStyle = _a.eventCellStyle,
    _c = _a.locale,
    locale = _c === void 0 ? 'en' : _c,
    _d = _a.hideNowIndicator,
    hideNowIndicator = _d === void 0 ? false : _d,
    _e = _a.mode,
    mode = _e === void 0 ? 'week' : _e,
    overlapOffset = _a.overlapOffset,
    _f = _a.scrollOffsetMinutes,
    scrollOffsetMinutes = _f === void 0 ? 0 : _f,
    _g = _a.showTime,
    showTime = _g === void 0 ? true : _g,
    _h = _a.style,
    style = _h === void 0 ? {} : _h,
    _j = _a.swipeEnabled,
    swipeEnabled = _j === void 0 ? true : _j,
    _k = _a.weekStartsOn,
    weekStartsOn = _k === void 0 ? 0 : _k,
    _l = _a.isRTL,
    isRTL = _l === void 0 ? false : _l,
    onChangeDate = _a.onChangeDate,
    onPressCell = _a.onPressCell,
    onPressDateHeader = _a.onPressDateHeader,
    onPressEvent = _a.onPressEvent
  var _m = React.useState(dayjs__default['default'](date)),
    targetDate = _m[0],
    setTargetDate = _m[1]
  React.useEffect(
    function () {
      if (date) {
        setTargetDate(dayjs__default['default'](date))
      }
    },
    [date],
  )
  var dayJsConvertedEvents = React.useMemo(
    function () {
      return events.map(function (e) {
        return __assign(__assign({}, e), {
          id: e.id,
          title: e.title,
          start: dayjs__default['default'](e.start),
          end: dayjs__default['default'](e.end),
        })
      })
    },
    [events],
  )
  var allDayEvents = React.useMemo(
    function () {
      return dayJsConvertedEvents.filter(isAllDayEvent)
    },
    [dayJsConvertedEvents],
  )
  var daytimeEvents = React.useMemo(
    function () {
      return dayJsConvertedEvents.filter(function (x) {
        return !isAllDayEvent(x)
      })
    },
    [dayJsConvertedEvents],
  )
  var dateRange = React.useMemo(
    function () {
      switch (mode) {
        case '3days':
          return getDatesInNextThreeDays(targetDate, locale)
        case 'week':
          return getDatesInWeek(targetDate, weekStartsOn, locale)
        case 'day':
          return getDatesInNextOneDay(targetDate, locale)
        default:
          throw new Error('undefined mode')
      }
    },
    [mode, targetDate],
  )
  React.useEffect(
    function () {
      if (onChangeDate) {
        onChangeDate([dateRange[0].toDate(), dateRange.slice(-1)[0].toDate()])
      }
    },
    [dateRange, onChangeDate],
  )
  var cellHeight = React.useMemo(
    function () {
      return Math.max(height - 30, MIN_HEIGHT) / 24
    },
    [height],
  )
  var onSwipeHorizontal = React.useCallback(
    function (direction) {
      if (!swipeEnabled) {
        return
      }
      if ((direction === 'LEFT' && !isRTL) || (direction === 'RIGHT' && isRTL)) {
        setTargetDate(targetDate.add(modeToNum(mode), 'day'))
      } else {
        setTargetDate(targetDate.add(modeToNum(mode) * -1, 'day'))
      }
    },
    [swipeEnabled, targetDate],
  )
  var commonProps = {
    cellHeight: cellHeight,
    dateRange: dateRange,
    style: style,
    isRTL: isRTL,
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      CalendarHeader,
      __assign({}, commonProps, {
        allDayEvents: allDayEvents,
        onPressDateHeader: onPressDateHeader,
        onPressEvent: onPressEvent,
        showTime: false,
      }),
    ),
    React.createElement(
      CalendarBody,
      __assign({}, commonProps, {
        containerHeight: height,
        dayJsConvertedEvents: daytimeEvents,
        eventCellStyle: eventCellStyle,
        hideNowIndicator: hideNowIndicator,
        overlapOffset: overlapOffset,
        scrollOffsetMinutes: scrollOffsetMinutes,
        ampm: ampm,
        showTime: showTime,
        onPressCell: onPressCell,
        onPressEvent: onPressEvent,
        onSwipeHorizontal: onSwipeHorizontal,
      }),
    ),
  )
}
var Calendar = React.memo(_Calendar)

exports.Calendar = Calendar
//# sourceMappingURL=index.js.map
