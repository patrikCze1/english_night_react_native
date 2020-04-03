import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import GameListItem from './games/GameListItem';

function Users() {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users

  const navigation = useNavigation();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Games')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  console.log(users);
  return (
    <FlatList
      //extraData={props}
      data={users}
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
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {},
  container: {},
  games: {},
  list: {},
});

export default Users;
