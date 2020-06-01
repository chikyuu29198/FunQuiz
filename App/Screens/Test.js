import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity } from 'react-native';
import {app} from '../firebaseConfig'
import store from '../redux/store';

class Test extends Component {
  constructor(props){
    super(props)
    // this.setItem = app.FirebaseDatabase.getInstance().getReference();
  }
  _onPress(){
        
    app.database().ref('listquiz').once('value').then((snapshot) => {
        var userdata = [];
        snapshot.forEach((child) => {
            userdata.push(child.val());
        })
        console.log(userdata)
    })
  }
  render() {
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