import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TextInput,
} from 'react-native';

class NewGameScreen extends Component {
  state = {
    name: '',
    date: '',
  };

  onSubmit = () => {
    if (!this.state.name || !this.state.date) {
      alert('Please fill all inputs.');
    } else {
      console.log(this.state.name + ' ' + this.state.date);
      this.props.route.params.saveGame(this.state.name);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View>
        <TextInput 
        placeholder="Name" 
        style={styles.input} 
        name='name'
        onChangeText={(value) => this.setState({name: value})}
        value={this.state.name}
        />

        <TextInput 
        placeholder="Date" 
        style={styles.input} 
        name='date'
        onChangeText={(value) => this.setState({date: value})}
        value={this.state.date}
        />

          <Button title='Save' onPress={this.onSubmit} />
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

export default NewGameScreen;
