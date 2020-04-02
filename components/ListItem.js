import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList,
    View
  } from 'react-native';

const ListItem = (props) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => props.deleteItem(props.item.id)}>
            <View>
            <View>
                <Text>{props.item}</Text>
            </View>
        </View>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 15,
      justifyContent: 'center',
      borderColor: 'black'
    }
  });

export default ListItem;