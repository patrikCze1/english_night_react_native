import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

import Tasks from '../components/tasks/Tasks';

const window = Dimensions.get('window');

class GameDetailScreen extends Component {
  state = {
    gameId: '',
    imageUrl: '',
    loading: true,
    isActive: true,
  };

  isGameUpcomming = timestamp => {
    const date = new Date(timestamp);
    const today = new Date();

    if (
      today.getFullYear() < date.getFullYear() ||
      today.getFullYear() <= date.getFullYear() &&
      today.getMonth() + 1 <= date.getMonth() &&
      today.getDate() <= date.getDate()
    ) {
      return true;
    }
    return false;
  };

  componentDidMount() {
    const {key, image, date} = this.props.route.params.game.item;
    const active = this.isGameUpcomming(date);
    this.setState({gameId: key, imageUrl: image});

    if (active) {
      this.props.navigation.setOptions({
        title: this.props.route.params.game.item.name,
        headerRight: () => (
          <Button
            onPress={() =>
              this.props.navigation.navigate('NewTask', {
                gameId: key,
              })
            }
            title="Add task"
          />
        ),
      });
    } else {
      this.setState({isActive: false});
      Alert.alert(
        'Game is over',
        '',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      )
    }

    const path = this.props.route.params.game.item.image;
    this.getImageUrl(path);
  }

  //image
  async getImageUrl(imgPath) {
    if (!imgPath) imgPath = '/games/default.jpg';

    await storage()
      .ref(imgPath)
      .getDownloadURL()
      .then(res => {
        this.setState({imageUrl: res});
        this.setState({loading: false});
      })
      .catch(err => {
        console.log(err)
        this.setState({loading: false});
      });
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          imageUrl: response.uri,
        });

        this.saveImage(response.uri);
      }
    });
  };

  async saveImage(path) {
    const gameId = this.state.gameId;
    const newPath = '/games/' + gameId + '.jpg';
    console.log('new path: ' + newPath);
    const reference = storage().ref(newPath);
    await reference.putFile(path);
    this.updateGame(newPath);
  }

  async updateGame(newPath) {
    await firestore()
      .collection('Games')
      .doc(this.state.gameId)
      .update({
        image: newPath,
      });
  }

  render() {
    const {key} = this.props.route.params.game.item; //id
    
    return (
      <View>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={this.chooseFile.bind(this)}>
            <Image
              source={{uri: this.state.imageUrl}}
              style={{height: 300, width: 'auto'}}
            />
          </TouchableOpacity>
        )}
        <View style={styles.list}>
          <Tasks
          gameId={key}
          isActive={this.state.isActive}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    height: window.height-390,
  },
});

export default GameDetailScreen;
