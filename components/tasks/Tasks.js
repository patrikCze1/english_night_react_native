import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import TaskListItem from './TaskListItem';

const Tasks = (props) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Tasks')
      .where('gameId', '==', props.gameId)
      .onSnapshot((querySnapshot) => {
        const tasks = [];

        querySnapshot.forEach((documentSnapshot) => {
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

  async function toggleComplete(taskId, isCompleted) {
    await firestore()
      .collection('Tasks')
      .doc(taskId)
      .update({
        completed: !isCompleted,
      });
  }

  async function deleteTask(taskId) {
    await firestore()
      .collection('Tasks')
      .doc(taskId)
      .delete();
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SwipeListView
      style={styles.list}
      data={tasks}
      renderItem={(task, rowMap) => (
        <TouchableHighlight
          style={styles.item}
          onPress={() =>
            navigation.navigate('TaskDetail', {coordinates: task.item.position})
          }>
          <TaskListItem task={task.item} />
        </TouchableHighlight>
      )}

      renderHiddenItem={(task, rowMap) => (
        <View style={styles.backRow}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity
              onPress={() => toggleComplete(task.item.key, task.item.completed)}>
              <Text style={styles.complete}>
                {task.item.completed ? 'uncompleted' : 'Complete'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteTask(task.item.key)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      rightOpenValue={-160}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    height: 450,
  },
  item: {
    padding: 15,
    margin: 0,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderBottomWidth: 1,
    borderColor: 'gray',
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
