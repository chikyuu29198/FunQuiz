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
import Images from '../../Assets/Images'
import Spinner from 'react-native-spinkit';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../../redux/store'
import CustomConfig from '../../Components/PuchMouse/CustomConfig'
import {app} from '../../firebaseConfig'

var RNFS = require('react-native-fs');

const { width, height } = Dimensions.get("window");
const background = require("../../Assets/images/loadingbg.png");
const logo = require("../../Assets/images/punchMouse_icon.png");

export default class PunchMouseInputKey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: null,
      key: "",
      name: "",

    }
  }

  handleDownload = (key, linkDownload) => {
    var destination = linkDownload.replace(/\//g, "");
    console.log("replace: " + destination)
    return this.download(key, linkDownload, `${RNFS.DocumentDirectoryPath}` + "/" +destination)
 
   };
   download = async (key, target, destination) => {
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
      if(key.includes("background"))
        store.dispatch({type: 'CONFIG_BACKGROUND', bg_uri: 'file://' + destination})
       else if (key.includes("sound"))
       store.dispatch({type: 'CONFIG_SOUND', sound_uri: 'file://' + destination})
     }catch(e){
       console.log("error")
       console.log(e)
     }
     return 'file://' + destination
   };

  async getData (_key, _name){
    //'11uGBq9i-C4nOiyxNyco1j9gPEq1HYPuDlFpquf6rvSw'
    const data_geted = await axios.get('https://edugame.azurewebsites.net', {
      params : {
        key: _key
      }
    })
    let user = store.getState().user.user
    if(typeof user == 'string')
    user = JSON.parse(user)
    console.log(typeof user + 'type')
    var key = null
    if(data_geted!=null){
     try{
       key = app.database().ref('PunchMouse').push({
        author: user.email,
        name: _name,
        key: _key
    }).key}catch(error){
        //error callback
        console.log('error ' , error)
    }
    }
    if (key!= null){
      console.log('test key: '+ key)
      await AsyncStorage.setItem('key2', key)
      await store.dispatch({type: 'SET_KEY', key: key})
      console.log(store.getState().gamePlaying.quizKey)
      console.log('test email: ' + user.email)
    var doneLevel = null
    try{
      app.database().ref('PunchMouse').child(key).child('ranking').once('value').then(snapshot => {
          snapshot.forEach((child) => {
            if(child.val().user == user.email){
              doneLevel = child.val().level
            }
          console.log(doneLevel)
        });
    })
   } catch (err){
     console.log(err)
   }
    if(doneLevel != null)
      AsyncStorage.setItem('CURRENT_LEVEL2', doneLevel.toString())
    else{
      try{
      AsyncStorage.setItem('CURRENT_LEVEL2', '0')
      app.database().ref('PunchMouse').child(key).child('ranking').push({
        user: user.email,
        level: 0
      })
    } catch (err){
      console.log(err)
    }
    }
    let nameOfKey = Object.keys(data_geted.data)
    var list_quiz = data_geted.data[nameOfKey[0]]
    var user_custom = data_geted.data[nameOfKey[1]]
    var total_level = list_quiz[list_quiz.length - 1].level
    list_quiz.pop()
    console.log('test list quiz' + list_quiz + " " + total_level)
    store.dispatch({type: 'GET_DATA', listQuiz: list_quiz, totalLevel: total_level})
    const data = JSON.stringify(list_quiz)
    await AsyncStorage.setItem('quizData2', data)
    // handle custom config
    var userCustom = {}
    for (i = 0; i<user_custom.length; i++){
      console.log(typeof user_custom[i].key)
      let lowerKey = user_custom[i].key.toLowerCase()
      console.log(lowerKey)
      if (lowerKey.includes("background")){
        // let uriBg = await this.downloadImage(CustomConfig.ASYN_URI_BACKGROUND, user_custom[i].value)
        let uriBg = await this.handleDownload(lowerKey, user_custom[i].value)
        console.log(uriBg)
        userCustom[CustomConfig.ASYN_URI_BACKGROUND] = uriBg
       
      }
      else if (lowerKey.includes("button color")){
        // AsyncStorage.setItem(CustomConfig.ASYN_BUTTON_COLOR, user_custom[i].value)
        store.dispatch({type: 'CONFIG_BTN_COLOR', btn_color: user_custom[i].value})
        console.log("test butoon: " + user_custom[i].value)
        userCustom[CustomConfig.ASYN_BUTTON_COLOR] = user_custom[i].value
      }
      else if(lowerKey.includes("sound")){
        let uriBg = await this.handleDownload(lowerKey, user_custom[i].value)
        console.log(uriBg)
        userCustom[CustomConfig.ASYN_SOUND] = uriBg
      }
    }
    AsyncStorage.setItem(CustomConfig.ASYN_ALL_CONFIG, JSON.stringify(userCustom))
    let test = await  AsyncStorage.getItem(CustomConfig.ASYN_ALL_CONFIG)
    console.log("Test save: " + test)
    }}
  async handleLoad(){
    if (this.state.key.trim() !== "" && this.state.name.trim() !== ""){
      this.setState({
          loading: true
      })
      await store.dispatch({type: 'RESET_DATA'})
      this.getData(this.state.key, this.state.name)
      // console.log( await AsyncStorage.getItem('quizData1'))
      setTimeout(function(){
        if(store.getState().quizData.listQuiz.length != 0){
          this.setState({loading: false})
          this.props.navigation.navigate('PunchMouseLevel')
        }
        else{
          this.setState({
            loading: false
          })
          Alert.alert('Loading failed! Please check and try again!')
        }
       }.bind(this), 15000);
    }
    else{
      Alert.alert(
        "Warning!",
        "You have to input name and key of quiz list. Please try again!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
    }
  }
  exitPress(){
    Alert.alert(
      //title
      'Cancle loading',
      //body
      'Are you sure you want to cancle ?',
      [
        {text: 'Yes', onPress: () => {this.props.navigation.navigate('PunchMouseHome')}},
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
                  <Image source = {require('../../Assets/images/PunchMouse_text.png')}
                  style={{
                     position: 'absolute',
                     width: 300,
                     height: 45
                  }}
                />
                  </View>           
               
              </View>
              <View style = {styles.content}>
              <View>
                <View style = {{flexDirection: 'row'}}>
                <Text style = {{ fontSize: 17,
                                color: '#2e0f05',
                                fontWeight: "bold",
                                paddingLeft: 10,
                                paddingBottom: 10}}>Name:</Text>
                <Text style = {{color: 'red',paddingBottom: 10, fontSize: 17}}>(*)</Text>
                </View>
                
                <View style = {styles.input}>
                <TextInput 
                  placeholderTextColor="#FFF"
                  placeholder="Please input name!" 
                  autoCapitalize="none"
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                  multiline={true}
                  numberOfLines={2}
                  style={styles.textInput}
                />
                </View>
              </View>
             
              <View>
              <View style = {{flexDirection: 'row'}}>
                <Text style = {{ fontSize: 17,
                                color: '#2e0f05',
                                fontWeight: "bold",
                                paddingLeft: 10,
                                paddingBottom: 10}}>Key:</Text>
                <Text style = {{color: 'red',paddingBottom: 10, fontSize: 17}}>(*)</Text>
                </View>
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
      flex: 3,
      justifyContent: 'flex-end',
      marginBottom: 30
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
      width: 80,
      height: 80,
      borderRadius: 70
  }

})