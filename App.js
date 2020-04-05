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
import {StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import GamesScreen from './screens/GamesScreen';
import GameDetailScreen from './screens/GameDetailScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import NewTaskScreen from './screens/NewTaskScreen';
import NewGameScreen from './screens/NewGameScreen';

import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();
const tasksRef = firestore().collection('Tasks');
const gamesRef = firestore().collection('Games');

class App extends Component {
  state = {
    games: [],
  }

  async saveGame(name, date) {
    await gamesRef.add({
      name: name,
      image: '/games/default.jpg',
      date: date,
    });
  }
  
  async saveTask(gameId, title, coordinates) {
    await tasksRef.add({
      gameId: gameId,
      title: title,
      position: coordinates.coordinate,
      completed: false
    });
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
                  onPress={() => alert('profile')}
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