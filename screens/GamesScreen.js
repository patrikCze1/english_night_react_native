import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, Button, Dimensions} from 'react-native';
import SideMenu from 'react-native-side-menu';
import {useNavigation} from '@react-navigation/native';

import Games from '../components/games/Games';
import Menu from './Menu';

const window = Dimensions.get('window');

class GamesScreen extends Component {
  state = {
    isOpen: false,
  };
  //const [isOpen, setOpen] = useState(false);
  //const navigation = useNavigation();
  /*
  useEffect(() => {
    const userInfo = this.props.route.params.userInfo;
    this.props.navigation.setOptions({
      title: 'Games',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('NewGame', {userInfo})}
          title="New"
        />
      ),
      headerLeft: () => (
        <Button onPress={() => setOpen(!isOpen)} title="Profile" />
      ),
    });
  }, [isOpen]);
*/
  componentDidMount() {
    console.log(this.props)
    const userInfo = this.props.route.params.userInfo;
    this.props.navigation.setOptions({
      title: 'Games',
      headerRight: () => (
        <Button
          onPress={() => this.props.navigation.navigate('NewGame', {userInfo})}
          title="New"
        />
      ),
      headerLeft: () => (
        <Button onPress={() => this.setOpen()} title="Profile" />
      ),
    });
  }

  setOpen = () => {
    const open = this.state.isOpen;
    this.setState({isOpen: !open}); 
  }

  render() {
    const menu = (
      <Menu
        userInfo={this.props.route.params.userInfo}
        addCode={this.props.route.params.addCode}
      />
    );

    return (
      <SideMenu menu={menu} isOpen={this.state.isOpen}>
        <View style={styles.body}>
          <Games userInfo={this.props.route.params.userInfo} />
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: window.height - 90,
    backgroundColor: 'rgb(240,240,240)',
  },
});

export default GamesScreen;
