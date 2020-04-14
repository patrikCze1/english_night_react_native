import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const GameListItem = props => {
  const {name, date} = props.game.item;
  const upcomming = isGameUpcomming(date);

  return (
    <View style={upcomming? styles.item : styles.inactive}>
      <Text style={upcomming? styles.title : styles.inactiveTitle}>{name}</Text>
      <Text style={!upcomming? styles.inactiveText : ''}>{getFormatDate(date)}</Text>
    </View>
  );
};

isGameUpcomming = timestamp => {
  const date = new Date(timestamp);
  const today = new Date();

  if (
    today.getFullYear() <= date.getFullYear() &&
    (today.getMonth() + 1) <= date.getMonth() &&
    today.getDate() <= date.getDate()
  ) { return true;}
  return false;
}

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
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomColor: '#4d4d4d',
    borderBottomWidth: 0.5,
  },
  inactive: {
    padding: 20,
    borderBottomColor: '#4d4d4d',
    borderBottomWidth: 0.5,
    backgroundColor: '#dfdfdf',
  },
  inactiveText: {
    color: 'rgba(0, 0, 0, 0.45)',
  },
  inactiveTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: 'rgba(0, 0, 0, 0.45)',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  }
});

export default GameListItem;
