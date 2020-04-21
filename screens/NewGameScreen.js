import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

class NewGameScreen extends Component {
  date = new Date();
  state = {
    name: '',
    date: '',
    time: '',
    userId: '',
  };

  componentDidMount() {
    this.setState({userId: this.props.route.params.userInfo.userId})
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
    if (!this.state.name || !this.state.date) {
      Alert.alert(
        'Warning',
        'Please fill all fields',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
    } else {
      const date = this.state.date.split('/');
      const hours = this.state.time.split(':');
      const time = new Date(date[2],date[1],date[0], hours[0],hours[1]);
      let code = Math.floor(Math.random() * 100000);
      code = code.toString();

      this.props.route.params.saveGame(this.state.name, time.getTime(), code);
      this.props.route.params.addCode(this.state.userId, code);
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          name="name"
          onChangeText={value => this.setState({name: value})}
          value={this.state.name}
        />

        <DatePicker
          style={styles.datePicker}
          date={this.state.date}
          mode="date"
          placeholder="Select date"
          format="DD/MM/YYYY"
          minDate="01/04/2020"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateInput: styles.dateInput,
          }}
          onDateChange={date => {
            this.setState({date: date});
          }}
        />

        <DatePicker
          style={styles.datePicker}
          date={this.state.time}
          mode="time"
          placeholder="Select time"
          format="HH:MM"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          customStyles={{
            dateInput: styles.dateInput,
          }}
          onDateChange={time => {
            this.setState({time});
          }}
        />
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
  },
  dateInput: {
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'flex-start',
    color: 'black',
  },
  datePicker: {
    marginBottom: 20,
    width: undefined,
  },
  container: {
    margin: 20,
  },
});

export default NewGameScreen;
