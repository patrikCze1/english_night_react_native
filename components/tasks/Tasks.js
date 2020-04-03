import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import TaskListItem from './TaskListItem';

function Tasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Tasks')
      .onSnapshot(querySnapshot => {
        const tasks = [];

        querySnapshot.forEach(documentSnapshot => {
          tasks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setTasks(tasks);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  //console.log(tasks);
  return (
    <SwipeListView
      style={styles.list}
      data={tasks}
      renderItem={(task, rowMap) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate('TaskDetail', {coordinates: task.item.position})
          }>
              
          <TaskListItem task={task.item} />
        </TouchableOpacity>
      )}
      renderHiddenItem={(task, rowMap) => (
        <View style={styles.backRow}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text
              style={styles.complete}
              onPress={() => this.completeTask(task.item.key)}>
              {task.item._completed ? 'uncompleted' : 'Complete'}
            </Text>

            <Text
              style={styles.delete}
              onPress={() => this.deleteTask(task.item.key)}>
              Delete
            </Text>
          </View>
        </View>
      )}
      rightOpenValue={-160}
    />
  );
}

const styles = StyleSheet.create({
    list: {
      height: 450
    },
    item: {
      padding: 15,
      margin: 10,
      justifyContent: 'center',
      backgroundColor: 'green',
      borderRadius: 4,
    },
    backRow: {
      alignItems: 'flex-end',
    },
    complete: {
      backgroundColor: 'blue',
      color: 'white',
      justifyContent: 'center',
      width: 80,
      height: 80,
    },
    delete: {
      backgroundColor: 'red',
      color: 'white',
      textAlign: 'center',
      width: 80,
    },
  });

export default Tasks;
