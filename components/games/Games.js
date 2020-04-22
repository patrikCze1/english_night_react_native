import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Alert,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {SwipeListView} from 'react-native-swipe-list-view';

import GameListItem from './GameListItem';

function Games(props) {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    getCodes();
  }, [props]);

  useEffect(() => {
    if (codes.length > 0) {
      const subscriber = firestore().collection('Games')
        .where('code', 'in', codes) 
        .onSnapshot(querySnapshot => {
        const games = [];
        
          querySnapshot.forEach(documentSnapshot => {
            games.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          
          games.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          setLoading(false);
          setGames(games);
        });

      return () => subscriber();
    } else {
      setLoading(false);
    }
  }, [codes]);

  // load user's game codes
  async function getCodes() {
    await firestore()
      .collection('Users')
      .doc(props.userInfo.userId)
      .onSnapshot(user => {
        setCodes(user._data.codes);
      });
  }

  async function deleteGame(gameId, code) {// admin
    console.log('deleting' + gameId);
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const path = 'games/' + gameId + '.jpg';

    const imageRef = storageRef.child(path);

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
    removeCode(code);
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

  async function removeCode(code) {
    await firestore()
      .collection('Users')
      .doc(props.userInfo.userId)
      .update({codes: firebase.firestore.FieldValue.arrayRemove(code)});
  }

  function showCode(code) {
    Alert.alert('Game code', code, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SwipeListView
      data={games}
      renderItem={(game, rowMap) => (
        <View style={{ height: 90 }}>
          <GameListItem {...game} />
        </View>
      )}
      renderHiddenItem={(game, rowMap) => (
        <View style={styles.backRow}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity
              onPress={() => showCode(game.item.code)}
              style={styles.btn}>
              <Text style={styles.info}>Info</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => removeCode(game.item.code)}>
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
    flexShrink: 0,
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
