import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const TaskListItem = (props) => {
  const {title, completed} = props.task;
  
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.completed}>
        <Text>
          {
          completed ? 
          <Image source={require('./../../static/icons/check20.png')} style={styles.img}/> 
          : 
          ''
          }
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#4d4d4d',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
  },
  completed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  img: {
  }
});

export default TaskListItem;
