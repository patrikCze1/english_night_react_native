import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

class TaskDetailScreen extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: [
      {
          id:1,
          latlng: {
          latitude: 37.804363,
          longitude: -122.271111,
        },
        title: 'marker1',
        description: 'some desc',
      },
      {
        id:2,
        latlng: {
          latitude: 37.826975,
          longitude: -122.422658,
        },
        title: 'alcatraz',
        description: 'some desc',
      },
    ],
  };

  onRegionChange(region) {
    //this.setState({region});
  }

  render() {
    return (
      <View style={{position: 'relative', flex: 1,}}>
        <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
          >
          {this.state.markers.map(marker => (
            <Marker
            key={marker.id}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />           
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = {
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};

export default TaskDetailScreen;
