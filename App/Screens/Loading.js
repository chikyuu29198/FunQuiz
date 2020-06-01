import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';
import Sound from 'react-native-sound'
import Sounds from '../Assets/Sounds.js'
import store from '../redux/store'
import Spinner from 'react-native-spinkit'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'; 
import Images from '../Assets/Images'
Sound.setCategory('Ambient')

class Loading extends Component {
  constructor(props){
    super(props)
  }
  async componentDidMount(){
    // let doneLevel = await AsyncStorage.getItem('CURRENT_LEVEL')
    // doneLevel = (doneLevel == null) ? 0 : parseInt(doneLevel)
    // store.dispatch({type: ' SET_DONE_LEVEL', done_level: doneLevel})
    // console.log(doneLevel + "test Asyn in Level.js")
    // store.dispatch({type: 'SET_DONE_LEVEL', done_level: doneLevel})
    let userData = await AsyncStorage.getItem('userData')
    // userData = ( userData == null) ? [] : JSON.parse(userData)
    // console.log(userData.email)
    store.dispatch({type: 'LOGIN_SUCCESS', user: userData})
    // let a = store.getState().user.user
    // // let test = JSON.parse(a)
    // console.log( a)
    if (userData == null) {
      this.props.navigation.navigate('Login')
    }
    else {
      user = JSON.parse(userData)
      this.props.navigation.navigate('Home')
    }
  }
  render() {
    return (
      <View >
        <ImageBackground
            source = {Images.loadingbg}
            style = {{width: '100%', height: '100%'}}
        >
        <View style = {styles.loading}> 
        <View style = {{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Image 
          style={{
            position: 'absolute',
            width: 70,
            height: 70,
        }} 
          resizeMode="stretch"
          source={Images.bird}
        />
        </View>
        <View style = {{flex: 1, justifyContent: 'flex-start'}}>
        <Spinner type="Circle" size={45} color="white" style={{alignSelf: "center"}}/>
        </View>
        </View>
        </ImageBackground>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
    imageBg: {
      flex: 1,
      
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loading_item: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center'
      }
  });
export default Loading; 