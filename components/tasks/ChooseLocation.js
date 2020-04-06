import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ChooseLocation extends Component {
  state = {
    region: {
      latitude: 50.208709,
      longitude: 15.832883,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0121,
    },
    marker: {
      coordinate: {
        latitude: 50.208709,
        longitude: 15.832883,
      },
    },
  };

  onPress = (e) => {
    let marker = this.state.marker;
    marker.coordinate = e.nativeEvent.coordinate;
    this.setState({marker});
    this.props.setCoordinates(marker);
  };

  render() {
    return (
      <MapView
        region={this.state.region}
        onRegionChangeComplete={(region) => this.setState({region})}
        onPress={(event) => this.onPress(event)}
        style={styles.map}>
        <Marker
          title="Selected location"
          coordinate={this.state.marker.coordinate}></Marker>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: screenHeight - 195,
    width: screenWidth,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});

export default ChooseLocation;
