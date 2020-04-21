import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TextInput,
  Alert,
} from 'react-native';

const window = Dimensions.get('window');
const uri =
  'https://i.pinimg.com/originals/d8/4a/5e/d84a5e4872c46b64736e69b0ededa7ef.jpg';

class Menu extends React.Component {
  state = {
    code: '',
    userId: '',
  };

  componentDidMount() {
    this.setState({userId: this.props.userInfo.userId})
  }

  onSubmit = () => {//todo check id, max 10 kodu
    if (this.state.code.length <= 5) {
      this.props.userInfo.codes.push(this.state.code);
      this.props.addCode(this.state.userId, this.state.code);
      this.setState({code: ''});
    } else {
      Alert.alert(
        'Warning',
        'Code can has max 5 characters',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
    }
  }

  render() {
    const {email} = this.props.userInfo;
    
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{uri}} />
          <Text style={styles.item}>{email}</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            placeholder="Game code"
            style={styles.input}
            name="code"
            onChangeText={value => this.setState({code: value})}
            value={this.state.code}
          />
          <Button title="Add code" onPress={this.onSubmit} />
          <Text style={styles.item}>About</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width * (2 / 3),
    height: window.height,
    padding: 20,
    backgroundColor: 'white',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    flex: 1,
  },
  container: {
    margin: 20,
  },
  item: {
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    paddingVertical: 5,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    height: 50,
    borderColor: 'gray',
    borderRadius: 30,
    borderWidth: 1,
  },
});

export default Menu;
