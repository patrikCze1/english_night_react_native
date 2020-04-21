import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import TaskListItem from './TaskListItem';

const Tasks = props => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Tasks')
      .where('gameId', '==', props.gameId)
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

    return () => subscriber();
  }, []);

  async function toggleComplete(taskId, isCompleted) {
    if (props.isActive) {
      try {
        await firestore()
          .collection('Tasks')
          .doc(taskId)
          .update({
            completed: !isCompleted,
          });
      } catch (error) {
        console.log(error);
      }
      props.updateTasksNumber();
    }
  }

  async function deleteTask(taskId) {
    if (props.isActive) {
      try {
        await firestore()
          .collection('Tasks')
          .doc(taskId)
          .delete();
      } catch (error) {
        console.log(error);
      }
      props.updateTasksNumber();
    }
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  if (tasks.length === 0) {
    return <Text style={styles.infoText}>No tasks, create one!</Text>;
  }

  return (
    <SwipeListView
      data={tasks}
      renderItem={(task, rowMap) => (
        <TouchableHighlight
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
              onPress={() => toggleComplete(task.item.key, task.item.completed)}
              style={styles.btn}>
              <View style={styles.complete}>
                {task.item.completed ? (
                  <Image source={require('./../../static/icons/back32.png')} />
                ) : (
                  <Image
                    source={require('./../../static/icons/checkwhite24.png')}
                    style={styles.img}
                  />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(task.item.key)}>
              <View style={styles.delete}>
                <Image source={require('./../../static/icons/trash32.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      rightOpenValue={-160}
    />
  );
};

const styles = StyleSheet.create({
  backRow: {
    alignItems: 'flex-end',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  complete: {
    fontSize: 16,
    backgroundColor: '#48adfa',
    color: 'white',
    width: 80,
    height: '100%',
    alignItems: 'center',
    paddingVertical: 19,
  },
  delete: {
    fontSize: 16,
    backgroundColor: '#ff362b',
    color: 'white',
    width: 80,
    height: '100%',
    paddingHorizontal: 23,
    paddingVertical: 15,
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center',
    paddingVertical: 15,
  },
});

export default Tasks;
