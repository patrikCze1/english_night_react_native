import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {RNCamera} from 'react-native-camera';

class Camera extends Component {
    state = {
        type: RNCamera.Constants.Type.back
    }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.type}
          flashMode={RNCamera.Constants.FlashMode.on}
        />

        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.changeCamera}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> Change camera </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  changeCamera = () => {
    if (this.state.type == RNCamera.Constants.Type.front) {
        this.setState({type: RNCamera.Constants.Type.back})
    } else {
        this.setState({type: RNCamera.Constants.Type.front})
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera;
