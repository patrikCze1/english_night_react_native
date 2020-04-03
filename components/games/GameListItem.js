import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const GameListItem = props => {
  const {name, date} = props.game.item;

  return (
    <View>
      <Text>{name}</Text>
      <Text>{getFormatDate(date)}</Text>
    </View>
  );
};

getFormatDate = timestamp => {
  const date = new Date(timestamp);
  const today = new Date();
  let minutes = date.getMinutes()

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (
    today.getFullYear() == date.getFullYear() &&
    (today.getMonth() + 1) == date.getMonth() &&
    today.getDate() == date.getDate()
  ) {
    return 'Today at: ' + date.getHours() + ':' + minutes;
  }
  return (
    date.getDate() +
    '/' +
    date.getMonth() +
    '/' +
    date.getFullYear() +
    ' at ' +
    date.getHours() +
    ':' +
    minutes
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 4,
  },
});

export default GameListItem;
