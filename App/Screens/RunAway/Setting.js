import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Switch,
  Alert

} from 'react-native';
import {ImageButton} from 'react-native-image-button-text';
import Images from '../../Assets/Images'
import Spinner from 'react-native-spinkit';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../../redux/store'
import CustomConfig from '../../Components/RunAway/CustomConfig';
import ToggleSwitch from 'toggle-switch-react-native';

const { width, height } = Dimensions.get("window");
const background = require("../../Assets/images/loadingbg.png");
const logo = require("../../Assets/images/Bird.png");

export default class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      soundStatus: true,
      key: ""
    }
  }
  async newData(){
    this.props.navigation.navigate('SelectData')
  }
  async resetLevel(){
    store.dispatch({type: 'RESET_LEVEL'})
    // AsyncStorage.removeItem( 'CURRENT_LEVEL2')
    try {
      await AsyncStorage.removeItem( 'CURRENT_LEVEL1');
      Alert.alert("Reset level successful")
    }
    catch(exception) {
        Alert.alert("Reset level failed")
    }
    // try {
    //   let key = await store.getState().gamePlaying.quizKey
    //   let user = await store.getState().user.user
    //   if(typeof user == 'string')
    //     user = JSON.parse(user)
    //   console.log(user.email)
    //   console.log(key)
    //   let deleteKey = null
    //   await app.database().ref('RunAway').child(key).child('ranking').once('value').then((snapshot) => {
    //     // var publicQuiz = [];
    //     snapshot.forEach((child) => {
    //       if(child.val().user == user.email){
    //         deleteKey = child.key
    //       }
    //     })        
    // })
    // if( deleteKey != null){
    //   await app.database().ref('RunAway').child(key).child('ranking').
    // }
    // }
    // catch(err) {

    // }
  }
  async resetDefaultSetting(){
    store.dispatch({type: 'RESET_CUSTOM'})
    try {
      await AsyncStorage.removeItem(CustomConfig.ASYN_ALL_CONFIG);
      Alert.alert("Reset default setting successful")
    }
    catch(exception) {
        Alert.alert("Reset default setting level failed")
    }
  }
  render() {
    return (     
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
          <View style = {{flex: 1, flexDirection: 'column'}}>
          <View style = {{flex:5, alignItems: 'center', justifyContent: 'center'}}>
            <Image source = {Images.bird}
              style = {{width: 70, height: 70}}
            >

            </Image>
          </View>
          <View style = {styles.container}>
            <View style = {{alignItems: 'center'}}>
              <Image source = {require('../../Assets/images/setting_text.png')}
                      style = {{top: -25, width: 180, height: 70}} />
            </View>
            <View style = {{flex:2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
              <TouchableOpacity  onPress={() => this.newData() }>
                <ImageBackground
                    source = {require('../../Assets/images/button.png')}
                    style = {{width: 210, height: 75}}
                  >
                    <View style = {{justifyContent: 'center', alignItems: 'center', paddingVertical: 15}}>
                      <Image 
                        source = {require('../../Assets/images/newData_text.png')}
                        style = {{width: 180, height: 40}}
                      />
                    </View>
                  </ImageBackground>
              </TouchableOpacity>
              <View style = {{height: 20}}></View>
              <TouchableOpacity  onPress={() =>this.resetLevel() }>
                <ImageBackground
                    source = {require('../../Assets/images/button.png')}
                    style = {{width: 210, height: 75}}
                  >
                    <View style = {{justifyContent: 'center', alignItems: 'center', paddingVertical: 15}}>
                      <Image 
                        source = {require('../../Assets/images/resetLevel.png')}
                        style = {{width: 150, height: 40}}
                      />
                    </View>
                  </ImageBackground>
              </TouchableOpacity>
              <View style = {{height: 20}}></View>
              <TouchableOpacity  onPress={() => this.resetDefaultSetting() }>
                <ImageBackground
                    source = {require('../../Assets/images/button.png')}
                    style = {{width: 210, height: 75}}
                  >
                    <View style = {{justifyContent: 'center', alignItems: 'center', paddingVertical: 15}}>
                      <Image 
                        source = {require('../../Assets/images/defaultSetting.png')}
                        style = {{width: 170, height: 40}}
                      />
                    </View>
                  </ImageBackground>
              </TouchableOpacity>
              </View>      
          </View>
          <View style = {{flex:1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 15, paddingBottom: 15}}>
          <View style = {{justifyContent: 'flex-end', marginEnd: 10, marginBottom: 20}}>
          <ImageButton
                width = {60}
                height = {60}
                text = ""
                onPress={() => this.props.navigation.navigate('RunAwayHome')}
                source = { Images.back}

              />
          </View>
          </View>
          </View>
         
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
background: {
    width,
    height,
    },
  container: {
    flex: 14,
    flexDirection: "column",
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 80,
    backgroundColor: '#7ebcf2',
    borderRadius: 20,
    paddingBottom: 30
  },

})