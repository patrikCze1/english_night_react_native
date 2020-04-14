import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Button, Dimensions} from 'react-native';
import SideMenu from 'react-native-side-menu';
import {useNavigation} from '@react-navigation/native';

import Games from '../components/games/Games';
import Menu from './Menu';

const window = Dimensions.get('window');

const GamesScreen = props => {
  const [isOpen, setOpen] = useState(false);
  const gameRef = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    //gameRef = React.createRef();
    const userInfo = props.route.params.userInfo;
    props.navigation.setOptions({
      title: 'Games',
      headerRight: () => (
        <Button onPress={() => navigation.navigate('NewGame', {userInfo})} title="New" />
      ),
      headerLeft: () => (
        <Button onPress={() => setOpen(!isOpen)} title="Profile" />
      ),
    });
  }, []);

  function updateGames() {
    console.log(gameRef)
  }
  console.log(gameRef)

  //console.log(props.route.params.userInfo);
  const menu = (
    <Menu
      userInfo={props.route.params.userInfo}
      addCode={props.route.params.addCode}
    />
  );
  return (
    <SideMenu menu={menu} isOpen={isOpen}>
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.games}>
            <Games userInfo={props.route.params.userInfo} ref={gameRef} />
          </View>
        </View>
      </View>
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  body: {
    height: window.height,
    backgroundColor: 'rgb(240,240,240)',
  },
  container: {},
  games: {},
  list: {},
});

export default GamesScreen;
