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
  Keyboard,
  TouchableWithoutFeedback, 
  Alert

} from 'react-native';
import {ImageButton} from 'react-native-image-button-text';
import Images from '../Assets/Images'
import Spinner from 'react-native-spinkit';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../redux/store'
import CustomConfig from '../Components/CustomConfig'

var RNFS = require('react-native-fs');

const { width, height } = Dimensions.get("window");
const background = require("../Assets/images/loadingbg.png");
const logo = require("../Assets/images/Bird.png");

export default class InputKey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: null,
      key: ""

    }
  }
  
  // setCustomize = async (key, value) => {
  //   setCustomize = async ( value) => {
  //   AsyncStorage.setItem(key, value)
  // }

  downloadImage = (linkDownload) => {
    // downloadImage = (key, linkDownload) => {
    // download(this.props.image.url, '_Subiz/image_' + this.props.image.name);
    //'https://i.pinimg.com/474x/c8/a9/9e/c8a99eb00f3269dc7673400b65f59e62--games-images-for-kids.jpg'
    var destination = linkDownload.replace(/\//g, "");
    console.log("replace: " + destination)
    // return this.download(key, linkDownload, `${RNFS.DocumentDirectoryPath}` + "/" +destination)
    return this.download(linkDownload, `${RNFS.DocumentDirectoryPath}` + "/" +destination)
 
   };
   download = async (target, destination) => {
    // download = async (key ,target, destination) => {
     try{
       let options = {
         fromUrl: target,
         toFile: destination,
         begin: (res) => {
         },
         progress: (data) => {
         },
         background: true,
         progressDivider: 1
       };
       console.log("options");
       const request = await RNFS.downloadFile(options).promise
       console.log(request)
      //  AsyncStorage.setItem('file://' + destination)
      //  AsyncStorage.setItem(key, 'file://' + destination)
       store.dispatch({type: 'CONFIG_BACKGROUND', bg_uri: 'file://' + destination})
     }catch(e){
       console.log("error")
       console.log(e)
     }
     return 'file://' + destination
   };

  async getData (_key){
    //'11uGBq9i-C4nOiyxNyco1j9gPEq1HYPuDlFpquf6rvSw'
    const data_geted = await axios.get('http://37298336.ngrok.io', {
      params : {
        key: _key
      }
    })
    console.log(data_geted)
    let nameOfKey = Object.keys(data_geted.data)
    var list_quiz = data_geted.data[nameOfKey[0]]
    var user_custom = data_geted.data[nameOfKey[1]]
    var total_level = list_quiz[list_quiz.length - 1].level
    list_quiz.pop()
    console.log('test list quiz' + list_quiz + " " + total_level)
    store.dispatch({type: 'GET_DATA', listQuiz: list_quiz, totalLevel: total_level})
    const data = JSON.stringify(list_quiz)
    await AsyncStorage.setItem('quizData', data)
    // handle custom config
    var userCustom = {}
    for (i = 0; i<user_custom.length; i++){
      let lowerKey = user_custom[i].key.toLowerCase()
      console.log(lowerKey)
      if (lowerKey.includes("background")){
        // let uriBg = await this.downloadImage(CustomConfig.ASYN_URI_BACKGROUND, user_custom[i].value)
        let uriBg = await this.downloadImage(user_custom[i].value)
        console.log(uriBg)
        userCustom[CustomConfig.ASYN_URI_BACKGROUND] = uriBg
       
      }
      else {
        // AsyncStorage.setItem(CustomConfig.ASYN_BUTTON_COLOR, user_custom[i].value)
        store.dispatch({type: 'CONFIG_BTN_COLOR', btn_color: user_custom[i].value})
        console.log("test butoon: " + user_custom[i].value)
        userCustom[CustomConfig.ASYN_BUTTON_COLOR] = user_custom[i].value
      }
    }
    AsyncStorage.setItem(CustomConfig.ASYN_ALL_CONFIG, JSON.stringify(userCustom))
    let test = await  AsyncStorage.getItem(CustomConfig.ASYN_ALL_CONFIG)
    console.log("Test save: " + test)
    }
  async handleLoad(){
      this.setState({
          loading: true
      })
      console.log(this.state.key)
      await this.getData(this.state.key)
      console.log( await AsyncStorage.getItem('quizData'))
      if(store.getState().quizData.listQuiz.length != 0){
        this.setState({loading: false})
        this.props.navigation.navigate('Level')
      }
  }
  exitPress(){
    Alert.alert(
      //title
      'Cancle loading',
      //body
      'Are you sure you want to cancle ?',
      [
        {text: 'Yes', onPress: () => {this.props.navigation.navigate('Home')}},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }
  render() {
    return (     
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
          <View style = {styles.container}>
              <View style = {styles.logo}>
                  <View style = {styles.exit}>
                  <ImageButton
                    width = {30}
                    height = {30}
                    paddingRight = {10}
                    text = ""
                    onPress={this.exitPress.bind(this)}
                    source = { Images.exit }                                
                 />
                  </View>
                  <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                  <Image source = {logo} style = {styles.logoImg}/>
                  </View>
                  <View style = {{alignItems: 'center'}}>
                  <Image source = {require('../Assets/images/RunAway_text.png')}
                  style={{
                     position: 'absolute',
                  }}
                />
                  </View>           
               
              </View>
              <View style = {styles.content}>
              <View style = {styles.input}>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Please input link to load data!" 
                autoCapitalize="none"
                onChangeText={key => this.setState({ key })}
                value={this.state.key}
                multiline={true}
                numberOfLines={4}
                style={styles.textInput}
              />
              </View>
              <View style = {styles.button}>
                {
                this.state.loading ?
                <TouchableOpacity >
                    <Spinner type="Circle" size={30} color="white" style={{alignSelf: "center"}}/>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={.5} onPress={() => this.handleLoad()}>
                    <Text style = { styles.buttonText}>Load</Text>
                </TouchableOpacity>
                }
              </View>
              </View>
              
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
background: {
    width,
    height,
    },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  exit: {
      flex: 1,
    marginLeft: width - 40
  },
  logo: {
      flex: 5,
      justifyContent: 'flex-end',
      marginBottom: 40
  },
  content: {
      flex: 12,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 70
  },
  input: {
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center'
  },
  textInput: {
      backgroundColor: "black",
      width: width - 40,
      maxHeight: height/6,
      paddingHorizontal: 15,
      opacity: 0.2,
      color: "white",
      borderRadius: 20
  },
  button: {
    backgroundColor: "#FF3366",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    height: 45,
    width: 100
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: 'bold'
  },
  logoImg: {
      width: 70,
      height: 70,
  }

})