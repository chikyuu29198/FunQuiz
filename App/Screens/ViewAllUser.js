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
import Images from '../Assets/Images'
import Spinner from 'react-native-spinkit';
import store from '../redux/store';
const { width, height } = Dimensions.get("window");
const background = require("../Assets/images/loadingbg.png");
const logo = require("../Assets/images/Bird.png");

class FlatListItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false
        }
      }
  
    render(){
        return(
            <View style = {{
            flex: 1,
            flexDirection: "row",
            marginVertical: 1,
            alignItems: 'center',
            opacity: 2,
            paddingVertical: 4,
            borderBottomColor: '#290136',
            borderBottomWidth: 0.5
        }}>
            
            <View style = {{flex: 5}}>
                <Text style = {styles.flatListText}> {this.props.item.name} </Text>
            </View>
            <View  style =  {{flex: 4}}>
                <Text style = {styles.flatListText}> {this.props.item.level}</Text>
            </View>
         <View style = {{height:1, backgroundColor: 'white'}}></View>
        </View>
     

        )
    }
}


export default class ViewAllUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
     }
  }
  goback(){
    console.log(store.getState().gamePlaying.quizKey)
    console.log(store.getState().gamePlaying.gameName)
    if(store.getState().gamePlaying.gameName == 'RUNAWAY'){
      this.props.navigation.navigate('SelectData')
    }
    else
    this.props.navigation.navigate('PunchMouseSelectData')
  }
  render() {
    return (
      <View >
        <ImageBackground
        source = {Images.loadingbg}
        style = {{width: '100%', height: '100%'}}
        >
        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
            <Image source = {require('../Assets/images/result_text.png')}
            style={{
            position: 'absolute',
            height: 35, width: 150
              }} 
                />
        </View>
        <View style = {{flex: 7, flexDirection: 'column', marginTop: 10, marginHorizontal: 30}}>
            <View style = {styles.publicbg}>
                <View style = {{flex: 1, flexDirection: 'column'}}>
                <View style = {styles.title}>
                    <View style = {{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
                         <Text style = {styles.flatListText}>User Name</Text>
                    </View>
                    <View style = {{flex: 4}}>
                         <Text style = {styles.flatListText}>Level</Text>
                    </View>
                   
                </View>
                {/* <Text style = {styles.categoryText}>Public quiz</Text> */}
                <View style = {{flex: 9}}>
                <FlatList
                    data = {this.props.navigation.state.params.data} 
                    renderItem = {({item, index}) => {
                        return (
                    <FlatListItem 
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
                  
                </View>
               
            </View>
            
        </View>
        
        <View style = {{flex:0.6, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 40, alignItems: 'center', marginVertical: 10}}>
       <View style = {{justifyContent: 'flex-end', marginEnd: 0}}>
       <ImageButton
            width = {50}
            height = {50}
            text = ""
            onPress={() => {this.goback()}}
            source = { Images.back}

          />

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

   },
   rightText: {
       flex: 2, 
       alignItems: 'center', 
    //    marginRight: 10
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
        // borderRadius: 10,
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
      title: {
          flex: 1,
          flexDirection: 'row',
          backgroundColor: "#290136",
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 2
      }
  });