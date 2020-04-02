import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Button, TouchableOpacity} from 'react-native'

import GameListItem from '../components/games/GameListItem';

const GamesScreen = (props) => {
  console.log(props);
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <View style={styles.games}>
          <FlatList 
          extraData={props}
          data={props.route.params.games} renderItem={(game) => (
            <TouchableOpacity style={styles.item} onPress={() => 
                props.navigation.navigate('GameDetail', {game: game})} >
              <GameListItem game={game} />
            </TouchableOpacity>
            )
          } />
        </View>
      </View>
    </View>
  );
}


const styles = {
  item: {
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 4,
  },
  body: {
    color: 'black',
  },
  container: {},
  games: {
    height: 'auto'
  },
};

export default GamesScreen;
