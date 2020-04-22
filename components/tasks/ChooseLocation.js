import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ChooseLocation extends Component {
  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 10.1,
      longitudeDelta: 10.1,
    },
    marker: {
      coordinate: {
        latitude: 50.208709,
        longitude: 15.832883,
      },
    },
  };
  //get user location and set it to state
  componentDidMount() {
    try {
      Geolocation.getCurrentPosition(info => {
        const coordinate = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        };
        this.setState({region: coordinate});
        const marker = this.state.marker;
        marker.coordinate = coordinate;
        this.setState({marker: marker});
      });
    } catch (error) {console.log(error)}
  }
  // change marker position
  onPress = e => {
    let marker = this.state.marker;
    marker.coordinate = e.nativeEvent.coordinate;
    this.setState({marker});
    this.props.setCoordinates(marker);
  };

  render() {
    return (
      <MapView
        region={this.state.region}
        onRegionChangeComplete={region => this.setState({region})}
        onPress={event => this.onPress(event)}
        showsUserLocation={true}
        style={styles.map}>
        <Marker
          title="Selected location"
          coordinate={this.state.marker.coordinate}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: screenHeight - 212,
    width: screenWidth,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});

export default ChooseLocation;
