import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  Text,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';

import GameListItem from './GameListItem';

function Games(props) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [games, setGames] = useState([]); // Initial empty array of games
  const [codes, setCodes] = useState(props.userInfo.codes);

  const navigation = useNavigation();
  
  useEffect(() => {
    const subscriber = firestore()
      .collection('Games')
      .where('code', 'in', props.userInfo.codes) //filter by user codes
      //.orderBy('date')
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
  }, [props.userInfo.codes]);

  async function getCodes() {
    const c = await firestore()
      .collection('Users')
      .doc(props.userInfo.userId)
      .onSnapshot((user) => {
        //console.log(user._data.codes)
        return user._data.codes;
      });
    setCodes(c);
  }

  async function deleteGame(gameId) {
    console.log('deleting' + gameId);
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const path = 'games/' + gameId + '.jpg';

    const imageRef = storageRef.child(path);
    console.log(imageRef);

    await firestore()
      .collection('Games')
      .doc(gameId)
      .delete()
      .then(success => console.log('game deleted'))
      .catch(err => console.log(err));

    if (imageRef.path != '/games/default.jpg') {
      imageRef
        .delete()
        .then(success => console.log('image deleted'))
        .catch(err => console.log(err));
    }
    deleteTasks(gameId);
  }

  async function deleteTasks(gameId) {
    await firestore()
      .collection('Tasks')
      .where('gameId', '==', gameId)
      .onSnapshot(querySnapshot => {
        const batch = firestore().batch();

        querySnapshot.forEach(document => {
          batch.delete(document.ref);
        });
        return batch.commit();
      })
      .then(success => console.log(success))
      .catch(err => console.log(err));
  }

  function refresh () {
    getCodes();
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SwipeListView
      style={styles.list}
      data={games}
      renderItem={(game, rowMap) => (
        <TouchableHighlight
          style={styles.item}
          onPress={() => navigation.navigate('GameDetail', {game: game})}>
          <GameListItem game={game} />
        </TouchableHighlight>
      )}
      renderHiddenItem={(game, rowMap) => (
        <View style={styles.backRow}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity
              onPress={() => alert('Code: ' + game.item.code)}
              style={styles.btn}>
              <Text style={styles.info}>Info</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteGame(game.item.key)}>
              <View style={styles.delete}>
                <Image source={require('./../../static/icons/trash32.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      rightOpenValue={-160}
    />
  );
}

const styles = StyleSheet.create({
  backRow: {
    alignItems: 'flex-end',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 20,
    backgroundColor: '#48adfa',
    color: 'white',
    width: 80,
    height: '100%',
    textAlign: 'center',
    paddingVertical: 30,
  },
  delete: {
    backgroundColor: '#ff362b',
    width: 80,
    height: '100%',
    paddingHorizontal: 23,
    paddingVertical: 25,
  },
});

export default Games;
