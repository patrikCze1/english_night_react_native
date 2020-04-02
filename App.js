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
import Home from './components/Home';
import Camera from './components/Camera';
import Game from './models/Game';

import GamesScreen from './screens/GamesScreen';
import GameDetailScreen from './screens/GameDetailScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import NewTaskScreen from './screens/NewTaskScreen';
import NewGameScreen from './screens/NewGameScreen';

const Stack = createStackNavigator();

class App extends Component {
  state = {
    games: [
      new Game(1,'hra', 'dneska'),
      new Game(2,'hra2', 'zitra'),
      new Game(3,'hra3', 'vcera'),
      new Game(4,'hra4', 'vcera'),
    ],
  }

  saveGame = (game) => {
    console.log('new game')
    let newList = this.state.games;
    //newList = [...newList, new Game(5, game, 'zitra')];
    newList.push(new Game(5, game, 'zitra'))
    console.log(newList)
    this.setState({games: newList})
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
              title: 'New task',
              /*headerRight: () => (
                <Button onPress={() => navigation.goBack()} title="Save" />
              ),*/
            })}
          />
          <Stack.Screen 
            name="GameDetail" 
            component={GameDetailScreen} 
            options={({navigation}) => ({
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('NewTask')}
                  title="Add task"
                />
              ),
            })}
          />
          <Stack.Screen 
            name="TaskDetail" 
            component={TaskDetailScreen} 
            options={{title: 'Task info'}}
          />
          <Stack.Screen 
            name="NewTask" 
            component={NewTaskScreen} 
            options={{
              title: 'New task',
              headerRight: () => (
                <Button
                  onPress={() => alert('save')}
                  title="Add task"
                />
              ),
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