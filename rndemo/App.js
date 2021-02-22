import React from 'react';
import {
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Calendar} from './build';
import dayjs from 'dayjs';

const events = [
  {
    title: 'Meeting',
    color: 'red',
    start: dayjs().set('hour', 10).set('minute', 0).toDate(),
    end: dayjs().set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Coffee break',
    color: 'green',
    start: dayjs().set('hour', 0).set('minute', 0).toDate(),
    end: dayjs().add(1, 'day').set('hour', 0).set('minute', 0).toDate(),
  },
  {
    title: 'Repair my car',
    color: 'purple',
    start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(1, 'day').set('hour', 13).set('minute', 30).toDate(),
  },
];

const App = () => {
  const [additionalEvents, setAdditionalEvents] = React.useState([]);
  const addEvent = React.useCallback(
    (start: Date) => {
      const title = 'new Event';
      const end = dayjs(start).add(59, 'minute');
      setAdditionalEvents([...additionalEvents, {start, end, title}]);
    },
    [additionalEvents, setAdditionalEvents],
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Calendar
          height={Dimensions.get('window').height - 50}
          events={[...events, ...additionalEvents]}
          onPressCell={addEvent}
          onPressEvent={(e) => alert(e.title)}
          ecentCellStyle={(event) => ({
            backgroundColor: event.color ? event.color : '#A5C4D4',
          })}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
