import React, {Component} from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

class TaskDetailScreen extends Component {
  state = {
    region: {
      latitude: this.props.route.params.coordinates.latitude,
      longitude: this.props.route.params.coordinates.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.02,
    },
    marker: 
      {
        coordinate: {
          latitude: this.props.route.params.coordinates.latitude,
          longitude: this.props.route.params.coordinates.longitude,
        },
      },
  };

  render() {
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

export default TaskDetailScreen;
