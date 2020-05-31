import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableOpacity } from 'react-native';
import store from '../redux/store'
import Spinner from 'react-native-spinkit'
import Loading from './Loading.js';
import Constants from '../Components/PuchMouse/Constants'
import { ImageButton } from "react-native-image-button-text";
import AsyncStorage from '@react-native-community/async-storage';
import Images from '../Assets/Images'
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      isSPinner : null,
      data : [],
      sound: store.getState().soundStatus
    }
  }

  runAway() {
    store.dispatch({type: 'RUNAWAY'})
    this.props.navigation.navigate('RunAwayHome')
  }
  punchMouse(){
    store.dispatch({type: 'PUNCH_MOUSE'})
    this.props.navigation.navigate('PunchMouseHome')
  }
  UNSAFE_componentWillMount(){
    store.dispatch({type: 'RESET_LEVEL'})
    console.log("reset done level before navigate: " + store.getState().level.doneLevel)
  }
  async logout() {
    await AsyncStorage.removeItem("userData");
    let test = await AsyncStorage.getItem("userData")
    console.log( test)
    this.props.navigation.navigate('Login')
  }
  changeSound(){
   let _sound = store.getState().soundStatus
    this.setState({
      sound: !_sound
    })
    store.dispatch({type: 'UPDATE_SOUND'})
  }
  help(){

  }
  render() {
    return (
      this.state.isSPinner ?
      <Loading/>
      :
      <View style={styles.container}>
      <ImageBackground
        source = {Images.homebg}
        style = {{width: '100%', height: '100%'}}
        >
      <View style = {{flex:2, justifyContent: 'center', alignItems: 'center'}}>
          
        <Image source = {require('../Assets/images/funquiz_text3.png')}
                style={{
                    position: 'absolute',
                    width: Constants.MAX_WIDTH -30,
                    height: 90
                }}
        />
      </View>
       <View style = {{flex: 2, flexDirection: 'row', marginTop: 15, alignItems: 'center', justifyContent: 'center'}}>
       {/* <Text>Play Game!</Text> */}
       <View style = {styles.gameBorder}>
       <TouchableOpacity  onPress={() => this.runAway() }>
          <View >
            <View style = {{alignContent: 'center', alignItems: 'center'}}>
              <View style = {{borderRadius: 10}}>
              <ImageBackground
                source = {require('../Assets/images/runaway_logo.png')}
                style={{
                  width: Constants.MAX_WIDTH/10*4,
                  height: Constants.MAX_WIDTH/9*4.5,
                  borderRadius: 10,
              }}
              >

              </ImageBackground>
              </View>
             
            <Image source = {require('../Assets/images/play_icon.png')}
                style={{
                position: 'absolute',
                top: -8,
                left: -8,
                width: 30,
                height: 30,
            }} 
            />
          <Text style = {styles.gameText}> RunAway</Text>
            </View>
          </View>
        </TouchableOpacity>
       </View>
       
       <View style = {styles.gameBorder}>
        <TouchableOpacity  onPress={() => this.punchMouse() }>
          <View >
            <View style = {{alignContent: 'center', alignItems: 'center'}}>
              <View style = {{borderRadius: 10}}>
              <ImageBackground
                source = {require('../Assets/images/PunchMouse_logo.png')}
                style={{
                  width: Constants.MAX_WIDTH/10*4,
                  height: Constants.MAX_WIDTH/9*4.5,
                  borderRadius: 10,
              }}
              >

              </ImageBackground>
              </View>
             
            <Image source = {require('../Assets/images/play_icon.png')}
                style={{
                position: 'absolute',
                top: -8,
                left: -8,
                width: 30,
                height: 30,
            }} 
            />
          <Text style = {styles.gameText}> Punch Mouse</Text>
            </View>
          </View>
        </TouchableOpacity>
       </View>
      
       </View>
       <View style = {{flex:2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
       <TouchableOpacity  onPress={() => this.logout() }>
        <Image
            source = {require('../Assets/images/logout.png')}
            style = {{width: 60, height: 60, borderRadius: 60}}
            />
       </TouchableOpacity>
       <View style = {{width:10}}></View>
       <TouchableOpacity  onPress={() => this.changeSound() }>
         <Image
          source = { this.state.sound ? Images.sound :  Images.unSound}
          style = {{width: 60, height: 60, borderRadius: 60}}
          />
       </TouchableOpacity>
       <View style = {{width:10}}></View>
       <TouchableOpacity  onPress={() => this.help() }>
         <Image
          source = {require('../Assets/images/help.png')}
          style = {{width: 60, height: 60, borderRadius: 60}}
          />
       </TouchableOpacity>
       </View>
      </ImageBackground>
      </View>

    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    gameBorder: {
      padding: 5, 
      backgroundColor: 'white',
       marginHorizontal:5, 
      //  borderWidth: 2, 
      //  borderColor: 'gray', 
       borderRadius: 10,
    },
    gameText: {
    color: '#40284c',
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: 'gray',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 20,
    shadowOpacity: 1,

    }
  });
export default Home; 