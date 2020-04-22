import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const GameListItem = props => {
  const {key, date, name} = props.item;
  const upcomming = isGameUpcomming(date);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Tasks')
      .where('gameId', '==', key)
      .onSnapshot(querySnapshot => {
        const tasks = [];

        querySnapshot.forEach(documentSnapshot => {
          tasks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        const completed = tasks.filter(task => task.completed == true);
        setCompletedTasks(completed.length);
        setTasks(tasks);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('GameDetail', {
          game: props,
        })
      }>
      <View style={upcomming ? styles.item : styles.inactive}>
        <Text style={upcomming ? styles.title : styles.inactiveTitle}>
          {name}
        </Text>
        
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Text style={!upcomming ? styles.inactiveText : ''}>
              {getFormatDate(date)}
            </Text>
          </View>

          <View style={styles.rightContainer}>
            <Text>
              {completedTasks} / {tasks.length}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

isGameUpcomming = timestamp => {
  const date = new Date(timestamp);
  const today = new Date();
  
  if (
    today.getFullYear() < date.getFullYear() ||
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() + 1 <= date.getMonth() &&
    today.getDate() <= date.getDate()
  ) {
    return true;
  }
  return false;
};

getFormatDate = timestamp => {
  const date = new Date(timestamp);
  const today = new Date();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (
    today.getFullYear() == date.getFullYear() &&
    today.getMonth() + 1 == date.getMonth() &&
    today.getDate() == date.getDate()
  ) {
    return 'Today at: ' + date.getHours() + ':' + minutes;
  }
  return (
    date.getDate() +
    '/' +
    date.getMonth() +
    '/' +
    date.getFullYear() +
    ' at ' +
    date.getHours() +
    ':' +
    minutes
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomColor: '#4d4d4d',
    borderBottomWidth: 0.8,
  },
  inactive: {
    padding: 20,
    borderBottomColor: '#4d4d4d',
    borderBottomWidth: 0.5,
    backgroundColor: '#dfdfdf',
  },
  inactiveText: {
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.45)',
  },
  inactiveTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'rgba(0, 0, 0, 0.45)',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default GameListItem;
