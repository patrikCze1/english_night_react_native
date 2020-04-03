import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

class TaskDetailScreen extends Component {
  state = {
    region: {
      latitude: this.props.route.params.coordinates.latitude,
      longitude: this.props.route.params.coordinates.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    marker: 
      {
        coordinate: {
          latitude: this.props.route.params.coordinates.latitude,
          longitude: this.props.route.params.coordinates.longitude,
        },
      },
  };

  componentDidMount() {
      console.log(this.state.marker)
  }

  render() {
    console.log(this.state.marker)
    return (
      <View style={{position: 'relative', flex: 1,}}>
        <MapView
          region={this.state.region}
          onRegionChangeComplete={region => this.setState({region})}
          showsUserLocation={true}
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
          >
            <Marker
              coordinate={this.state.marker.coordinate}
            />           
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
});

export default TaskDetailScreen;
