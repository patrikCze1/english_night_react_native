import React, {Component} from 'react';
import {StyleSheet, View, Button, TextInput, Text, Alert} from 'react-native';
import ChooseLocation from '../components/tasks/ChooseLocation';

class NewTaskScreen extends Component {
  state = {
    title: '',
    position: {
      coordinate: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.04,
        longitudeDelta: 0.02,
      },
    },
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => <Button onPress={this.onSubmit} title="Save" />,
    });
  }

  onSubmit = () => {
    if (!this.state.title || !this.state.position) {
      Alert.alert('Warninng', 'Please fill all fields', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      this.props.route.params.saveTask(
        this.props.route.params.gameId,
        this.state.title,
        this.state.position,
      );
      this.props.navigation.goBack();
    }
  };

  setCoordinates = coordinates => {
    this.setState({position: coordinates});
  };

  render() {
    console.log(this.props.route.params);
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
        <Text style={styles.containerText}>Select postion</Text>
        <View>
          <ChooseLocation setCoordinates={this.setCoordinates} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderRadius: 30,
    borderWidth: 1,
    color: 'black',
  },
  container: {
    margin: 20,
  },
  containerText: {
    marginLeft: 20,
  },
});

export default NewTaskScreen;
