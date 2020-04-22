//quick time - sdileni mobilu

import 'react-native-gesture-handler'; // must be first
import * as React from 'react';
import {Component, Alert} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import GamesScreen from './screens/GamesScreen';
import GameDetailScreen from './screens/GameDetailScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import NewTaskScreen from './screens/NewTaskScreen';
import NewGameScreen from './screens/NewGameScreen';
import AuthScreen from './screens/AuthScreen';

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
      completed: false,
    });
  }

  async addCode(userId, code) {
    const games = await gamesRef.where('code', '==', code).get();
    
    if (games.docs[0]) {
      await usersRef
        .doc(userId)
        .update({codes: firebase.firestore.FieldValue.arrayUnion(code)})
        .then(success => console.log('success'))
        .catch(err => console.log(err));
    } 
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={AuthScreen} />
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
            })}
          />
          <Stack.Screen name="GameDetail" component={GameDetailScreen} />
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
export default App;
