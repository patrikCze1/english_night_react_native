/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 *///quick time - sdileni mobilu

import 'react-native-gesture-handler'; // must be first
import * as React from 'react';
import {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import GameListItem from './components/games/GameListItem';
import Camera from './components/Camera';
import Game from './models/Game';
import Task from './models/Task';

import GamesScreen from './screens/GamesScreen';
import GameDetailScreen from './screens/GameDetailScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import NewTaskScreen from './screens/NewTaskScreen';
import NewGameScreen from './screens/NewGameScreen';

import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

class App extends Component {
  state = {
    games: [
      new Game(1,'hra', 1585923152938),
      new Game(2,'hra2', 1585923152938),
      new Game(3,'hra3', 1585925536827),
    ],
    tasks: [
      new Task(1, 2, 'vypij pivo', {longitude: -122.45194179178512, latitude: 37.78317882579094}, false),
      new Task(2, 2, 'vypij 1 pivo', {longitude: -122.45194179178512, latitude: 37.78317882579094}, true),
      new Task(3, 2, 'vypij 2 panaky', {longitude: -122.45194179178512, latitude: 37.78317882579094}, true),
    ],
  }

  async getGames() {
    const gamesCollection = await firestore().collection('Games').doc('gameId').get();;

    console.log('collection: '+gamesCollection);
  }

  saveGame = (name, time) => {
    console.log('new game')
    let newList = this.state.games;
    //newList = [...newList, new Game(5, game, 'zitra')];
    newList.push(new Game(5,  name, time));
    console.log(newList);
    this.setState({games: newList})
  }

  saveTask = (gameId, title, coordinates) => {
    let tasks = this.state.tasks;
    tasks.push(new Task(6, gameId, title, coordinates.coordinate));
    this.setState({tasks});
    console.log(this.state.tasks);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Games">
          <Stack.Screen
            name="Games"
            component={GamesScreen}
            initialParams={{games: this.state.games}}
            options={({navigation}) => ({
              title: 'Games',
              headerLeft: () => (
                <Button
                  onPress={() => navigation.navigate('Camera')}
                  title="Profile"
                />
              ),
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('NewGame')}
                  title="New"
                />
              ),
            })}
          />
          <Stack.Screen 
            name="NewGame" 
            component={NewGameScreen} 
            initialParams={{saveGame: this.saveGame}}
            options={({navigation}) => ({
              title: 'New game',
              /*headerRight: () => (
                <Button onPress={() => navigation.goBack()} title="Save" />
              ),*/
            })}
          />
          <Stack.Screen 
            name="GameDetail" 
            component={GameDetailScreen} 
            initialParams={{tasks: this.state.tasks}}
          />
          <Stack.Screen 
            name="TaskDetail" 
            component={TaskDetailScreen} 
            options={{title: 'Task location'}}
          />
          <Stack.Screen 
            name="NewTask" 
            component={NewTaskScreen} 
            initialParams={{saveTask: this.saveTask}}
            options={{
              title: 'New task',
            }}
          />
          
          <Stack.Screen 
            name="Camera" 
            component={Camera} 
            options={{title: 'Camera'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  body: {

  },
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 15,
    backgroundColor: 'red',
  },
  games: {
    padding:0,
  }
});

export default App;
//todo map, foto,icons