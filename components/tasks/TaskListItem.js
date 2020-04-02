import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Button
  } from 'react-native';

const TaskListItem = (props) => {
    //console.log(props.task.item.id);
  const { _title, _position, _completed } = props.task.item;
    return (
        <View>
          <Text>{_title}</Text>
          <Text>{_position}</Text>
          <Text style={styles.completed}>
            {_completed ? 'hotovo' : 'ne'}
          </Text>
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
    }
  });

export default TaskListItem;