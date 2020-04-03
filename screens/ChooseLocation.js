import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';

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

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => this.onSubmit} title="Choose" />
      ),
    });
  }

  onSubmit = () => {
      console.log('onsubmit')
    const region = this.state({marker});
    this.props.chooseLocation(region);
    this.props.navigation.goBack();
  };

  onPress = e => {
    console.log(e.nativeEvent.coordinate);
    let marker = this.state.marker;
    marker.coordinate = e.nativeEvent.coordinate;
    this.setState({marker});
  };

  render() {
    return (
      <View style={{position: 'relative', flex: 1}}>
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
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  plainView: {
    width: 60,
  },
});

export default ChooseLocation;
