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
    let userData = await AsyncStorage.getItem('userData')
    store.dispatch({type: 'LOGIN_SUCCESS', user: userData})
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