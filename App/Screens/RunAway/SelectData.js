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
  FlatList,
  Alert

} from 'react-native';
import {ImageButton} from 'react-native-image-button-text';
import Images from '../../Assets/Images'
import Spinner from 'react-native-spinkit';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../../redux/store'
import CustomConfig from '../../Components/RunAway/CustomConfig'
import {app} from '../../firebaseConfig'

var RNFS = require('react-native-fs');

const { width, height } = Dimensions.get("window");
const background = require("../../Assets/images/loadingbg.png");
const logo = require("../../Assets/images/Bird.png");

class FlatListItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
      }
    handleDownload = (key, linkDownload) => {
        var destination = linkDownload.replace(/\//g, "");
        console.log("replace: " + destination)
        return this.download(key, linkDownload, `${RNFS.DocumentDirectoryPath}` + "/" +destination)
     
       };
       download = async (key, target, destination) => {
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
    
      async getData (_key){
        const data_geted = await axios.get('https://edugame.azurewebsites.net', {
          params : {
            key: _key,
          }
        })
        // let user = store.getState().user.user
        // user = JSON.parse(user)
        // if(data_geted!=null){
        //   app.database().ref('listquiz').push({
        //     author: user.email,
        //     name: _name,
        //     key: _key
        // }).then((data)=>{
        //     //success callback
        //     console.log('data ' , data)
        // }).catch((error)=>{
        //     //error callback
        //     console.log('error ' , error)
        // })
      
        // }
       
        console.log(data_geted)
        let nameOfKey = Object.keys(data_geted.data)
        var list_quiz = data_geted.data[nameOfKey[0]]
        var user_custom = data_geted.data[nameOfKey[1]]
        var total_level = list_quiz[list_quiz.length - 1].level
        list_quiz.pop()
        console.log('test list quiz' + list_quiz + " " + total_level)
        store.dispatch({type: 'GET_DATA', listQuiz: list_quiz, totalLevel: total_level})
        const data = JSON.stringify(list_quiz)
        await AsyncStorage.setItem('quizData1', data)
        // handle custom config
        var userCustom = {}
        for (i = 0; i<user_custom.length; i++){
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
        }
      async handleLoad(_key){
          this.setState({
              loading: true
          })
        //   console.log(this.state.key)
          await this.getData(_key)
          console.log( await AsyncStorage.getItem('quizData1'))
          if(store.getState().quizData.listQuiz.length != 0){
            this.setState({loading: false})
            console.log("Loaf thành công")
            // this.props.navigation.navigate('Level')
          }
      }
    render(){
        return(
        <TouchableOpacity  onPress={() =>
            // console.log(this.props.item.key)
            this.handleLoad(this.props.item.key)    
            } >
            <View style = {{
            flex: 1,
            backgroundColor: "#290136",
            borderRadius: 5,
            flexDirection: "row",
            marginVertical: 5,
            marginHorizontal: 10,
            alignItems: 'center',
            opacity: 1
        }}>
            <View style = {{flex: 2}}>
                <Image
                source = {Images.bird}
                style = {{
                    width: 50,
                    height: 50,
                    marginVertical: 5,
                    marginLeft: 10,
                }}
                />
            </View>
            
            <View style = {{flex: 5}}>
                <Text style = {styles.flatListText}> {this.props.item.name} </Text>
            </View>
            <View  style =  {styles.rightText}>
                <Text style = {styles.compeletedText}> {this.props.item.author}</Text>
            </View>
        
        </View>
        </TouchableOpacity>
        )
    }
}


export default class SelectData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: null,
      listData: []

    }
  }
  async UNSAFE_componentWillMount(){

      let list = await this.getPublicQuiz()
      this.setState({
          listData: list
      })
      console.log("test will mousse" + list)
  }
   async getPublicQuiz () {
    var publicQuiz = [];
    await app.database().ref('listquiz').once('value').then((snapshot) => {
        // var publicQuiz = [];
        snapshot.forEach((child) => {
            publicQuiz.push(child.val());
        })
        
        
    })
    console.log("Test get "+publicQuiz)
    return publicQuiz;
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
      <View >
        <ImageBackground
        source = {Images.loadingbg}
        style = {{width: '100%', height: '100%'}}
        >
        <View style = {{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
        <Image source = {require('../../Assets/images/select_level.png')}
         style={{
          position: 'absolute',
      }} 

       />
        </View>
        <View style = {{flex: 7, flexDirection: 'column'}}>
            <View style = {styles.publicbg}>
                <Text style = {styles.categoryText}>Public quiz</Text>
                <FlatList
            data = {this.state.listData}
            renderItem = {({item, index}) => {
                return (
                    <FlatListItem 
                        navigation = {this.props.navigation}
                        item = {item}
                        index = {index}
                        keyExtractor = {item.key}
                    />
                )
                 }}
              >
                </FlatList> 
            </View>
            <View style = {styles.yourbg}>
                <Text style = {styles.categoryText}>Your quiz</Text>
                <FlatList
            data = {this.state.listData}
            renderItem = {({item, index}) => {
                return (
                    <FlatListItem 
                        navigation = {this.props.navigation}
                        item = {item}
                        index = {index}
                        keyExtractor = {item.key}
                    />
                )
                 }}
              >
                </FlatList> 
            </View>
        

        </View>
        
        <View style = {{flex:0.8, flexDirection: 'row', justifyContent: 'center'}}>
        <View style = {styles.button}>
                {
                this.state.loading ?
                <TouchableOpacity >
                    <Spinner type="Circle" size={30} color="white" style={{alignSelf: "center"}}/>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={.5} onPress={() => this.handleLoad()}>
                    <Text style = { styles.buttonText}>Input new</Text>
                </TouchableOpacity>
                }
              </View>
       </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   flatListText: {
       color: 'white',
       fontSize: 16,
       textAlign: 'center',
       alignItems: 'center',
       alignContent: 'center',
       justifyContent: 'center',
       fontWeight: 'bold'
   },
   compeletedText: {
    color: 'green',
    fontSize: 12,
    fontStyle: 'italic'
    // textAlign: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center'
   },
   lockText: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic'
    // textAlign: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center'
   },
   rightText: {
       flex: 3, 
       alignItems: 'flex-end', 
       marginRight: 10
    },
    categoryText: {
        fontSize: 17,
        color: '#2e0f05',
        fontWeight: "bold",
        paddingLeft: 10,
        paddingVertical: 3
    },
    publicbg: {
        backgroundColor: 'gray',
        flex: 4,
        marginHorizontal: 10,
        marginBottom: 10
    },
    yourbg: {
        backgroundColor: 'blue',
        flex: 2,
        marginHorizontal: 10,
        marginBottom: 10
    },
    button: {
        backgroundColor: "#FF3366",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 20,
        // marginHorizontal: 20,
        borderRadius: 15,
        height: 45,
        width: 120
      },
      buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
      },
  });