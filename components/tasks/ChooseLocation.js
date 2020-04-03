import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const screenWidth = Math.round(Dimensions.get('window').width);

class ChooseLocation extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    marker: {
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    },
  };

  onSubmit = () => {
      console.log('onsubmit')
    const region = this.state({marker});
    this.props.chooseLocation(region);
  };

  onPress = e => {
    //console.log(e.nativeEvent.coordinate);
    let marker = this.state.marker;
    marker.coordinate = e.nativeEvent.coordinate;
    this.setState({marker});
    this.props.setCoordinates(marker);
  };

  render() {
    return (
      <View style={styles.map}>
        <MapView
          region={this.state.region}
          onRegionChangeComplete={region => this.setState({region})}
          onPress={event => this.onPress(event)}
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}>
          <Marker
            title="Selected location"
            coordinate={this.state.marker.coordinate}></Marker>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 400,
    width: screenWidth,
  },
});

export default ChooseLocation;
