import React, { Component } from 'react';
import {View, StyleSheet, Button, Dimensions, ImageBackground} from 'react-native';
import SideMenu from 'react-native-side-menu';

import Games from '../components/games/Games';
import Menu from './Menu';

const window = Dimensions.get('window');
const imageSrc = require('../static/images/bg.jpg');

class GamesScreen extends Component {
  state = {
    isOpen: false,
  };
  
  componentDidMount() {
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
        <ImageBackground source={imageSrc} style={styles.image}>
        <View style={styles.body}>
          <Games userInfo={this.props.route.params.userInfo} />
        </View>
        </ImageBackground>
     </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    height: window.height - 65,
    //backgroundColor: 'rgb(240,240,240)',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default GamesScreen;
