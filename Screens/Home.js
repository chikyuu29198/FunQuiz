import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Sound from 'react-native-sound'
import Sounds from '../Assets/Sounds.js'
import store from '../redux/store'
Sound.setCategory('Ambient')

class Home extends Component {
  _onPress = () => {
    this.props.navigation.navigate('RunAway')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Play Game!</Text>
        <Button
          title="Start Game"
          onPress={() =>
            this._onPress()    
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default Home; 