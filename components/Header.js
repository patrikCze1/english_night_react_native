import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 35,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'blue',
    height: 90,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
});

export default Header;
