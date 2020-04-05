import React, {Component} from 'react';
import {StyleSheet, View, Button, TextInput, Text} from 'react-native';
import ChooseLocation from '../components/tasks/ChooseLocation';

class NewTaskScreen extends Component {
  state = {
    title: '',
    position: {
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={this.onSubmit}
          title="Save"
        />
      ),
    })
  }

  onSubmit = () => {
    if (!this.state.title || !this.state.position) {
      alert('Please fill all inputs.');
    } else {
      this.props.route.params.saveTask(this.props.route.params.gameId ,this.state.title, this.state.position);
      this.props.navigation.goBack();
    }
  };

  setCoordinates = coordinates => {
    this.setState({position: coordinates});
  }

  render() {
    console.log(this.props.route.params)
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            name="title"
            onChangeText={value => this.setState({title: value})}
            value={this.state.title}
          />
        </View>
        <View>
          <Text>Select postion</Text>
          <ChooseLocation setCoordinates={this.setCoordinates} />
        </View>
      </View>
    );
  }
}
//todo vetsi mapa
const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderRadius: 30,
    borderWidth: 1,
  },
  dateInput: {
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  datePicker: {
    marginBottom: 20,
    width: undefined,
  },
  container: {
    margin: 20,
  },
});

export default NewTaskScreen;
