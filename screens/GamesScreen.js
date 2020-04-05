import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'

import GameListItem from '../components/games/GameListItem';

import Games from '../components/games/Games';

const GamesScreen = (props) => {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <View style={styles.games}>
          <Games />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 4,
  },
  body: {
  },
  container: {

  },
  games: {
    
  },
  list: {
    
  }
});

export default GamesScreen;
