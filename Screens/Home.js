import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Sound from 'react-native-sound'
import Sounds from '../Assets/Sounds.js'

Sound.setCategory('Ambient')

class Home extends Component {
  _onPress = () => {
    this.props.navigation.navigate('RunAway')
    var sound1 = new Sound(require('../Assets/sounds/backgroundSound.mp3'),
    (error, sound) => {
    if (error) {
      alert('error');
      return;
    }
    // Sound.setCategory('Ambient');
    sound1.setNumberOfLoops(-1);
    sound1.play(() => {
      // sound1.release();
    });
    });
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