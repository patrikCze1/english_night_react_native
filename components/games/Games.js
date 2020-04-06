import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import GameListItem from './GameListItem';

function Games() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [games, setGames] = useState([]); // Initial empty array of games

  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Games')
      .orderBy('date', 'desc')
      .onSnapshot(querySnapshot => {
        const games = [];

        querySnapshot.forEach(documentSnapshot => {
          games.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setGames(games);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={games}
      renderItem={game => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('GameDetail', {game: game})}
        >
          <GameListItem game={game} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
  },
  body: {},
  container: {},
  games: {},
  list: {},
});

export default Games;
