import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Button
  } from 'react-native';

const GameListItem = (props) => {
  const { _name, _date } = props.game.item;
    return (
        <View>
          <Text>{_name}</Text>
          <Text>{_date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
      padding: 15,
      margin: 10,
      justifyContent: 'center',
      backgroundColor: 'green',
      borderRadius: 4,
    }
  });

export default GameListItem;