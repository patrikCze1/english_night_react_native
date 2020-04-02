import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TextInput,
} from 'react-native';

const NewGameForm = () => {
  return (
    <View>
      <TextInput
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        placeholder="Date"
        style={styles.input}
      />
    </View>
  );
};

const styles = {
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1
  }
}

export default NewGameForm;
