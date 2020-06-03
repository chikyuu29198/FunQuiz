import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
 
} from 'react-native';
import {app} from '../firebaseConfig'


export default class SignupScreen extends Component {
  clicked(){
    console.log('a')
    app.database().ref('RunAway').child('-M8siYs38_2xreSqPMvC').child('ranking').push({
      user: "chi",
      level: 9
    })
  }
  render() {
    return (     
      <View >
       <TouchableOpacity onPress = {this.clicked()}> 
         <Text>nhấn</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});