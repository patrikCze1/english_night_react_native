import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import TaskListItem from '../components/tasks/TaskListItem';

import Tasks from '../components/tasks/Tasks';

class GameDetailScreen extends Component {
  state = {
    gameId: '',
    tasks: [],
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
    this.props.navigation.setOptions({
      title: this.props.route.params.game.item.name,
      headerRight: () => (
        <Button
          onPress={() => this.props.navigation.navigate('NewTask', {gameId: this.props.route.params.game.item._id})}
          title="Add task"
        />
      ),
    })

    //todo get tasks...
  }

  render() {
    const {_id, _name} = this.props.route.params.game.item;
    const {tasks} = this.props.route.params;
    const imagePath = require('./images/profile.jpg');
    //console.log(this.state.tasks[0].completed);
    console.log(this.props);

    return (
      <View>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Camera')}>
          <Image 
          source={imagePath} 
          style={{height: 300, width: 'auto'}} 
          onPress={()=> alert('image clicked')}
          />
        </TouchableOpacity>

        <TouchableHighlight onPress={() => alert('image')}>
          <Text>Btn</Text>
        </TouchableHighlight>

        <Tasks />
      </View>
    );
  }
}
//todo list zobrazeni az dolu
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

export default GameDetailScreen;
//todo - tab - fotky/hraci