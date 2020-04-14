import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

import Tasks from '../components/tasks/Tasks';

class GameDetailScreen extends Component {
  state = {
    gameId: '',
    tasks: [],
    imageUrl: '',
    loading: true,
  };

  componentDidMount() {
    const {key, image} = this.props.route.params.game.item;

    this.setState({gameId: key, imageUrl: image});

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
    const path = this.props.route.params.game.item.image;
    this.getImageUrl(path);
  }

  async getImageUrl(imgPath) {
    if (!imgPath) imgPath = '/games/default.jpg';

    await storage()
      .ref(imgPath)
      .getDownloadURL()
      .then((res) => {
        this.setState({imageUrl: res});
        this.setState({loading: false});
        //console.log(res);
      })
      .catch((err) => {
        this.setState({loading: false});
        //console.log(err);
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

  async saveImage(path) {//todo zmensit
    const gameId = this.state.gameId;
    const newPath = '/games/' + gameId + '.jpg';
    console.log('new path: ' + newPath)
    const reference = storage().ref(newPath);
    await reference.putFile(path);
    this.updateGame(newPath);
  }

  async updateGame (newPath) {
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
          <TouchableOpacity
          onPress={this.chooseFile.bind(this)}
          >
            <Image
              source={{uri: this.state.imageUrl}}
              style={{height: 300, width: 'auto'}}
            />
          </TouchableOpacity>
        )}
        <Tasks
          gameId={key}
          completeTask={this.completeTask}
          deleteTask={this.deleteTask}
        />
        </View>
    );
  }
}
//todo list zobrazeni az dolu
const styles = StyleSheet.create({
  list: {
    height: 400,
  },
});

export default GameDetailScreen;
//todo - tab - fotky/hraci
