import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import TaskListItem from '../components/tasks/TaskListItem';

import Task from '../models/Task';

class GameDetailScreen extends Component {
  static navigationOptions = () => ({
    title: 'asd',
  })

  state = {
    gameId: '1',
    tasks: [
      new Task(1, 2, 'vypij pivo', 'hradec', true),
      new Task(2, 2, 'vypij 1 pivo', 'hradec', true),
      new Task(3, 2, 'vypij 2 panaky', 'hradec', true),
      new Task(4, 2, 'vypij pivo', 'hradec', false),
      new Task(5, 2, 'vypij pivo', 'hradec', false),
    ],
  };

  deleteTask = id => {
    console.log('removing task ' + id);
    //todo 
  }

  completeTask = id => {
    console.log('completing task ' + id);
    //todo 
  }

  componentDidMount() {
    this.props.navigation.setParams({title: 'value'})

    //todo get tasks...
  }

  render() {
    const {_id, _name} = this.props.route.params.game.item;
    const imagePath = require('./images/profile.jpg');
    //console.log(this.state.tasks[0].completed);
    //console.log(this.props.route.params.game.item);

    return (
      <View>
        <Image source={imagePath} style={{height: 300, width: 'auto'}} />
        <Text>{_name} id: {_id}</Text>

        <SwipeListView
          data={this.state.tasks}
          renderItem={(task, rowMap) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                this.props.navigation.navigate('TaskDetail', {taskId: task._id})
              }>
              <TaskListItem task={task} />
              
            </TouchableOpacity>
          )}

          renderHiddenItem={ (task, rowMap) => (
            <View style={styles.backRow}>
              <View style={{flexDirection:'row', flexWrap:'wrap'}}> 
                <Text 
                style={styles.complete}
                onPress={() => this.completeTask(task.item._id)}
                >
                  {task.item._completed ? 'uncompleted' : 'Complete'}
                  </Text>

                <Text 
                style={styles.delete}
                onPress={() => this.deleteTask(task.item._id)}
                >
                  Delete
                </Text>
              </View>
                
            </View>
        )}
          rightOpenValue={-160}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default GameDetailScreen;
//todo - tab - fotky/hraci