import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Button, TextInput} from 'react-native';

class NewTaskScreen extends Component {
  state = {
    title: '',
    position: '',
  };

  onSubmit = () => {
    if (!this.state.title || !this.state.position) {
      alert('Please fill all inputs.');
      return;
    } else {
      console.log(this.state.title);
      console.log(this.state.position);
      //this.props.saveTask(); todo
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Title"
          style={styles.input}
          name="title"
          onChangeText={value => this.setState({title: value})}
          value={this.state.title}
        />

        <TextInput
          placeholder="Position"
          style={styles.position}
          name="position"
          onChangeText={value => this.setState({position: value})}
          value={this.state.position}
        />

        <Button title="Save" onPress={this.onSubmit} />
      </View>
    );
  }
}

const styles = {
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
};

export default NewTaskScreen;
