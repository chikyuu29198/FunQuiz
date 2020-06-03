import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity } from 'react-native';
import {app} from '../firebaseConfig'
import store from '../redux/store';

class Test extends Component {
  constructor(props){
    super(props)
    // this.setItem = app.FirebaseDatabase.getInstance().getReference();
  }
  async _onPress(){      
    
    //content://

    let backgroundSound = new Sound(require('../../Assets/sounds/custombgsound.mp3'),
    (error, sound) => {
    if (error) {
      console.log("Can not load background sound")
      return;
    }
    backgroundSound.setNumberOfLoops(-1)
    })
    return (
      <View >
        <TouchableOpacity onPress={() => this._onPress()}>
            <View style = {{width: 60, height: 60, backgroundColor: 'green'}}><Text>Test</Text></View>
            
        
        </TouchableOpacity>
      </View>
      
    );
  }
}
export default Test; 