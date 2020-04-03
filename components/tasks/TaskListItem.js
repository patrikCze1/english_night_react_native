import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Button} from 'react-native';

const TaskListItem = props => {
  //console.log(props.task.item.id);
  const {title, position, completed, key} = props.task;

  return (
    <View>
      <Text>{key}</Text>
      <Text>{title}</Text>
      <Text>{position._longitude}</Text>
      <Text style={styles.completed}>{completed ? 'hotovo' : 'ne'}</Text>
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
  },
  completed: {
    textAlign: 'right',
  },
});

export default TaskListItem;
