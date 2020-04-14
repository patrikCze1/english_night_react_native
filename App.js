//quick time - sdileni mobilu

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
import FingerPrint from './components/FingerPrint';

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();
const tasksRef = firestore().collection('Tasks');
const gamesRef = firestore().collection('Games');
const usersRef = firestore().collection('Users');

class App extends Component {

  async saveGame(name, date, code) {
    await gamesRef.add({
      name: name,
      image: '/games/default.jpg',
      date: date,
      code: code,
    });

    this.addCode(userId, code);
  }
  
  async saveTask(gameId, title, coordinates) {
    await tasksRef.add({
      gameId: gameId,
      title: title,
      position: coordinates.coordinate,
      completed: false
    });
  }

  async addCode(userId, code) {
    console.log(userId)
    await usersRef
    .doc(userId)
    .update(
      { codes: firebase.firestore.FieldValue.arrayUnion(code) }
    )
    .then(success => console.log(success))
    .catch(err => console.log(err));
  }

  async removeCode(userId, code) {
    await usersRef
    .doc(userId)
    .update(
      { codes: firebase.firestore.FieldValue.arrayRemove(code) }
    );
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={FingerPrint} 
          />
          <Stack.Screen
            name="Games"
            component={GamesScreen}
            initialParams={{addCode: this.addCode}}
          />
          <Stack.Screen 
            name="NewGame" 
            component={NewGameScreen} 
            initialParams={{saveGame: this.saveGame, addCode: this.addCode}}
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