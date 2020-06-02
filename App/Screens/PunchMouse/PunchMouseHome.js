import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound'
import Sounds from '../../Assets/Sounds.js'
import store from '../../redux/store'
import Spinner from 'react-native-spinkit'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../Loading.js';
import CustomConfig from '../../Components/PuchMouse/CustomConfig';
import Constants from '../../Components/PuchMouse/Constants'
import { ImageButton } from "react-native-image-button-text";
Sound.setCategory('Ambient')

class PunchMouseHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      isSPinner : null,
      data : []
    }
  }

  settingCustom(userCustom) {
    console.log("test list custom in Home" + userCustom)
    var list_custom_key =  Object.keys(userCustom)
    for(i = 0; i< list_custom_key.length; i++) {
      if (list_custom_key[i] == CustomConfig.ASYN_URI_BACKGROUND ){
        store.dispatch({type: 'CONFIG_BACKGROUND', bg_uri: userCustom[list_custom_key[i]]})
      }
      else if (list_custom_key[i] == CustomConfig.ASYN_BUTTON_COLOR ){
        store.dispatch({type: 'CONFIG_BTN_COLOR', btn_color: userCustom[list_custom_key[i]]})
      }
    }
  }
  _onPress = async () => {
    console.log("game: " +store.getState().gamePlaying)
    let data =  await AsyncStorage.getItem('quizData2')
    let userCustom = await AsyncStorage.getItem(CustomConfig.ASYN_ALL_CONFIG)
    console.log(data)
    data = (data == null) ? [] : JSON.parse(data)
    console.log("test list custom in PunchHome" + data + ",lengh: " + data.length)
    userCustom = ( userCustom == null) ? [] : JSON.parse(userCustom)

    // await this.settingCustom(userCustom)
    // if (store.getState().quizData.listQuiz.length == 0){
      if (data.length != 0){
        console.log("have local data")
        console.log(data[data.length - 1].level)
        let doneLevel = await AsyncStorage.getItem('CURRENT_LEVEL2')
        // console.log("tets donr"+doneLevel)
        // console.log(typeof doneLevel + "value: " + doneLevel)
        doneLevel = (doneLevel == null) ? 0 : parseInt(doneLevel)
        await store.dispatch({type: ' SET_DONE_LEVEL', done_level: doneLevel})
        await store.dispatch({type: 'SET_DONE_LEVEL', done_level: doneLevel})
        console.log("done level in PuchMouseHome " + store.getState().level.doneLevel)
        await store.dispatch({type: 'GET_DATA', listQuiz: data, totalLevel: data[data.length - 1].level})
        test = await store.getState().quizData.listQuiz
       console.log( " lenght " + test.length)
        if(test.length != 0){ this.props.navigation.navigate('PunchMouseLevel')}
      }
      else{
        console.log("NOT")
        let doneLevel = await AsyncStorage.getItem('CURRENT_LEVEL2')
        doneLevel = (doneLevel == null) ? 0 : parseInt(doneLevel)
        await store.dispatch({type: 'SET_DONE_LEVEL', done_level: doneLevel})
        console.log("done level in PuchMouseHome " + store.getState().level.doneLevel)
        this.props.navigation.navigate('PunchMouseInputKey')
    }
  }
  help(){

  }
  setting(){
    this.props.navigation.navigate("PunchMouseSetting")
  }

  render() {
    return (
      this.state.isSPinner ?
      <Loading/>
      :
      <View style={styles.container}>
        <Image source = {require('../../Assets/images/punchMouseHome.png')}
                style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: Constants.MAX_WIDTH,
                height: Constants.MAX_WIDTH*13/12,
            }} 
            resizeMode="stretch"
            />
       <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            
          <Image source = {require('../../Assets/images/PunchMouse_text.png')}
                  style={{
                     position: 'absolute',
                     width: Constants.MAX_WIDTH -30,
                     height: 60
                  }}
          />
       </View>
       <View style = {{flex: 2, marginTop: 0, alignItems: 'center', justifyContent: 'center'}}>
       {/* <Text>Play Game!</Text> */}
       <TouchableOpacity  onPress={() => this._onPress() }>
         <ImageBackground
          source = {require('../../Assets/images/play_text.png')}
          style = {{width: 120, height: 60}}
          >          
          </ImageBackground>
       </TouchableOpacity>
       <TouchableOpacity  onPress={() => this.setting() }>
         <ImageBackground
          source = {require('../../Assets/images/setting_text.png')}
          style = {{width: 180, height: 60}}
          >          
          </ImageBackground>
       </TouchableOpacity>
       <TouchableOpacity  onPress={() => this._onPress() }>
         <ImageBackground
          source = {require('../../Assets/images/help_text.png')}
          style = {{width: 120, height: 60}}
          >          
          </ImageBackground>
       </TouchableOpacity>
       </View>
       <View style = {{flex:3, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 15, paddingBottom: 15}}>
       <View style = {{justifyContent: 'flex-end', marginEnd: 0}}>
       <ImageButton
            width = {70}
            height = {70}
            text = ""
            onPress={() => this.props.navigation.navigate('Home')}
            source = { Images.back}
          />

       </View>
       </View>
      
       
     
      {/* </ImageBackground> */}
      </View>

    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#3a8f83'
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
export default PunchMouseHome; 