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
import Constants from '../../Components/PuchMouse/Constants';

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
    async handleDelete(_key){
      Alert.alert(
        //title
        'Remove data',
        //body
        'Are you sure you want remove this quiz ?',
        [
          {text: 'Yes', onPress: async()  => {
            await app.database().ref('RunAway').child(_key).remove().then((data)=>{
            //success callback
            Alert.alert('Remove successful!')
        }).catch((error)=>{
          Alert.alert('Remove failed!')
            console.log('error ' , error)
        })
      
        }},
          {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
        //clicking out side of alert will not cancel
      );
    }
    async handleView(_key){
    var userList = [];
      await app.database().ref('RunAway').child(_key).child('ranking').once('value').then((snapshot) => {
          // var publicQuiz = [];
          snapshot.forEach((child) => {
            userList.push({
                name: child.val().user,
                level: child.val().level
              })
          })        
      })
     console.log(userList)
     this.props.navigation.navigate('ViewAllUser', {
      data: userList})
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
    
      async getData (_key, _severKey){
        const data_geted = await axios.get('https://edugame.azurewebsites.net', {
          params : {
            key: _key,
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
        await AsyncStorage.setItem('quizData1', data)
        //get userInfor
        var user = store.getState().user.user
        if (typeof user == 'string'){
          user = JSON.parse(user)
        }
        //Check data level of user in sever
        var doneLevel = null
        await app.database().ref('RunAway').child(_severKey).child('ranking').once('value').then(snapshot => {
            snapshot.forEach((child) => {
              // console.log(user.email)
              if(child.val().user == user.email){
                doneLevel = child.val().level
              }
            // console.log('done level in server: ' + doneLevel)
          });
      })
      console.log( 'test:' +doneLevel + typeof doneLevel)
      if(doneLevel != null){
        // console.log(doneLevel)
        await AsyncStorage.setItem('CURRENT_LEVEL1', doneLevel.toString())
        let tests = await AsyncStorage.getItem('CURRENT_LEVEL1')
        // console.log('same in sever: ' + tests)
      }
       
      else {
        // console.log('dont have in server')
        AsyncStorage.setItem('CURRENT_LEVEL1', '0')
        // console.log(user.email)
        try{
        app.database().ref('RunAway').child(_severKey).child('ranking').push({
          user: user.email,
          level: 0
        })
      } catch (err){
        console.log(err)
      }
      }
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
        await AsyncStorage.setItem('key1', _severKey)
        await store.dispatch({type: 'SET_KEY', key: _severKey})
        }
      async handleLoad(_key, _severKey){

          this.props.loadingUpdate()
        //   console.log(this.state.key)
          // await this.getData(_key, _severKey)
          // console.log( await AsyncStorage.getItem('quizData1'))
          // if(store.getState().quizData.listQuiz.length != 0){
          //   this.setState({loading: false})
          //   console.log("Loaf thành công")
          //   this.props.loadingUpdate()
          //   this.props.navigation.navigate('Level')
          // }

          this.props.loadingUpdate()
          await store.dispatch({type: 'RESET_DATA'})
          this.getData(_key, _severKey)
          setTimeout(function(){
            if(store.getState().quizData.listQuiz.length != 0){
              console.log("Loaf thành công")
              this.props.loadingUpdate()
              this.props.navigation.navigate('Level')
            }
            else{
              this.props.loadingUpdate()
              Alert.alert('Loading failed! Please check and try again!')
            }
           }.bind(this), 15000);
      }
    render(){
        return(
        this.props.typeRender == 'public' ?
        <TouchableOpacity  onPress={() =>
            // console.log(this.props.item.key)
            this.handleLoad(this.props.item.data.key, this.props.item.key)    
            } >
            <View style = {{
            flex: 1,
            backgroundColor: "#290136",
            borderRadius: 5,
            flexDirection: "row",
            marginVertical: 1,
            marginHorizontal: 10,
            alignItems: 'center',
            opacity: 2
        }}>
            <View style = {{flex: 2}}>
                <Image
                source = {Images.bird}
                style = {{
                    width: 40,
                    height: 40,
                    marginVertical: 3,
                    marginLeft: 10,
                }}
                />
            </View>
            
            <View style = {{flex: 5}}>
                <Text style = {styles.flatListText}> {this.props.item.data.name} </Text>
            </View>
            <View  style =  {styles.rightText}>
                <Text style = {styles.compeletedText}> {this.props.item.data.author}</Text>
            </View>
        
        </View>
        </TouchableOpacity>
        :
        <View  style = {{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View style = {{flex: 5}}>
          <TouchableOpacity  onPress={() =>
            // console.log(this.props.item.key)
            this.handleLoad(this.props.item.data.key, this.props.item.key)    
            } >
            <View style = {{
            flex: 1,
            backgroundColor: "#290136",
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
            flexDirection: "row",
            marginVertical: 1,
            // marginHorizontal: 10,
            marginLeft: 10,
            alignItems: 'center',
            opacity: 2
        }}>
            <View style = {{flex: 2}}>
                <Image
                source = {Images.bird}
                style = {{
                    width: 40,
                    height: 40,
                    marginVertical: 3,
                    marginLeft: 10,
                }}
                />
            </View>
            
            <View style = {{flex: 10}}>
                <Text style = {styles.flatListText}> {this.props.item.data.name} </Text>
            </View>
            </View>
           </TouchableOpacity>
          </View>
            <View  style =  {styles.deleteButton}>
               <TouchableOpacity onPress={() =>
                   this.handleDelete(this.props.item.key)    
            } >
               <Image source = {Images.trash}
                style = {{
                    width: 30,
                    height: 30,
                    marginVertical: 3,
                    marginRight: 5,
                    paddingRight: 5
                }}></Image>
               </TouchableOpacity>                
            </View>
            <View  style =  {styles.socialButton}>
               <TouchableOpacity onPress={() =>
                   this.handleView(this.props.item.key)    
            } >
               <Image source = {Images.social}
                style = {{
                    width: 30,
                    height: 30,
                    marginVertical: 3,
                    marginRight: 5,
                    paddingRight: 5
                }}></Image>
               </TouchableOpacity>                
            </View>
            </View>
        )
    }
}


export default class SelectData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      listData: [],
      yourQuiz: [],

    }
  }
  loadingUpdate = () => {
    this.setState({
      loading: true
    })
  }
  async UNSAFE_componentWillMount(){

      let list = await this.getPublicQuiz()
      
      console.log("test will mousse" + list)
      let yourData = []
      let user = store.getState().user.user
      if (typeof user == 'string')  user = JSON.parse(user)
      for (i = 0; i<list.length; i++){
        if(list[i].data.author == user.email)
        yourData.push(list[i])
      }
      this.setState({
        listData: list,
        yourQuiz: yourData,
        loading: false
    })
    app.database().ref('RunAway').on('child_removed', (snapshot) => {
      list = list.filter((x) => x.key != snapshot.key)
      yourData = yourData.filter((x) => x.key != snapshot.key)
      this.setState({
        listData: list,
        yourQuiz: yourData,
        loading: false
      })
    })
  }
   async getPublicQuiz () {
    var publicQuiz = [];
    await app.database().ref('RunAway').once('value').then((snapshot) => {
        // var publicQuiz = [];
        snapshot.forEach((child) => {
            publicQuiz.push({
              data: child.val(),
              key: child.key
            })
        })        
    })
    return publicQuiz;
  }

  render() {
    return (
      <View >
        { this.state.loading == false ?
        <ImageBackground
        source = {Images.loadingbg}
        style = {{width: '100%', height: '100%'}}
        >
        <View style = {{flex: 0.6, alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
            <Image source = {require('../../Assets/images/select_quiz.png')}
            style={{
            position: 'absolute',
            height: 40, width: 200
              }} 
                />
        </View>
        <View style = {{flex: 7, flexDirection: 'column', marginTop: 10}}>
            <View style = {styles.publicbg}>
                <Text style = {styles.categoryText}>Public quiz</Text>
                <FlatList
            data = {this.state.listData}
            renderItem = {({item, index}) => {
                return (
                    <FlatListItem 
                        navigation = {this.props.navigation}
                        typeRender = {'public'}
                        loadingUpdate = {this.loadingUpdate}
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
               { this.state.yourQuiz.length != 0 ?
                <FlatList
            data = {this.state.yourQuiz}
            renderItem = {({item, index}) => {
                return (
                    <FlatListItem 
                        navigation = {this.props.navigation}
                        typeRender = {'yourQuiz'}
                        loadingUpdate = {this.loadingUpdate}
                        item = {item}
                        index = {index}
                        keyExtractor = {item.key}
                    />
                )
                 }}
              >
                </FlatList> 
                :
                <Text style = {styles.categoryText}>You do not have any quiz before!</Text>
  }
            </View>

        </View>
        
        <View style = {{flex:0.8, flexDirection: 'row', paddingBottom: 10}}>
          <View style = {{flex:1, justifyContent: 'center', right: -120}}>
          <View style = {styles.button}>
                <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate("InputKey")}>
                    <Text style = { styles.buttonText}>Input new</Text>
                 </TouchableOpacity>
          </View>
          </View>      
          <View style = {{flex: 1,justifyContent: 'center', marginLeft: Constants.MAX_HEIGHT/2 - 70}}>
          <ImageButton
                width = {45}
                height = {45}
                text = ""
                onPress={() => this.props.navigation.navigate('RunAwayHome')}
                source = { Images.back}

              />      
              </View>
       </View>
        </ImageBackground>
        :
        null
    
    }
    {
      this.state.loading == true ?
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
  :
  null
    }

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

   },
   lockText: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic'

   },
   rightText: {
       flex: 3, 
       alignItems: 'flex-end', 
       marginRight: 10
    },
    deleteButton: {
      flex: 1,
      backgroundColor: "#290136",
      marginVertical: 1,
      // marginLeft: 5,
      alignItems: 'center',
      opacity: 2,
      justifyContent: 'center'
   },
   socialButton: {
    flex: 1,
    backgroundColor: "#290136",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    // flexDirection: "row",
    marginVertical: 1,
    // marginLeft: 5,
    marginRight: 10,
    alignItems: 'center',
    opacity: 2,
    justifyContent: 'center'
 },
    categoryText: {
        fontSize: 17,
        color: '#2e0f05',
        fontWeight: "bold",
        paddingLeft: 10,
        paddingVertical: 3
    },
    publicbg: {
        backgroundColor: '#6ca3d4',
        flex: 4,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        opacity: 0.8
    },
    yourbg: {
        backgroundColor: '#ad95a0',
        flex: 2,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        opacity: 0.8
    },
    button: {
        backgroundColor: "#FF3366",
        alignItems: "center",
        justifyContent: "center",
        alignContent: 'center',
        borderRadius: 15,
        height: 45,
        width: 120
      },
      buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
      },
      loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
  });