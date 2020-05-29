import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import store from '../../redux/store'
import Spinner from 'react-native-spinkit'
import Images from '../../Assets/Images'
import { connect } from 'react-redux';
import { handleCorrect, handleInCorrect, plusScore, enableAnswer, disableAnswer} from '../../redux/actionCreators';
import AsyncStorage from '@react-native-community/async-storage';
import { ImageButton } from "react-native-image-button-text";
class FlatListItem extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     quizLevel: []
        // }
      }

    _onPress(level){
    //    let test = AsyncStorage.getItem('CURRENT_LEVEL')
    //    console.log(test + "test Asyn in Level.js")
       var data = store.getState().quizData.listQuiz
       var quizLevel = data.filter((x)=>x.level == level);
       store.dispatch({type: 'SET_CURRENT_LEVEL', current_level: level})
    //    let test = store.getState().level.currentLevel
    //     console.log("level " + test)
       store.dispatch({ type: 'RESET_INDEX'})
       store.dispatch({type: 'UNFLAGGED_WIN'})
       store.dispatch({type: 'ENABLE_ANSWER'})
        // store.dispatch({type: 'RESET_LEVEL'})
    //    console.log("test" + store.getState().updateLevel)
       this.props.navigation.navigate('GameWorld', {
                                        data: quizLevel
       })
    }

    render(){
        return(
            this.props.item.key <= store.getState().level.doneLevel + 1?
                this.props.item.key <= store.getState().level.doneLevel ?
                <TouchableOpacity  onPress={() =>
                    this._onPress(this.props.item.key)    
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
                        <Text style = {styles.flatListText}> {this.props.item.value} </Text>
                    </View>
                    <View  style =  {styles.rightText}>
                        <Text style = {styles.compeletedText}> Completed!</Text>
                    </View>
                
                </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() =>
                    this._onPress(this.props.item.key)    
                  }
                >
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
                        <Text style = {styles.flatListText}> {this.props.item.value} </Text>
                    </View>
                    <View  style =  {styles.rightText}>
                        <Image 
                            source = {Images.currentPosition}
                            style = {{
                                width: 25,
                                height: 25,
                                marginRight: 15,
                            }}
                        />
                    </View>
                
                </View>
                </TouchableOpacity>
            :
            <TouchableOpacity disabled = {true}>
                <View style = {{
                flex: 1,
                backgroundColor: "gray",
                borderRadius: 5,
                flexDirection: "row",
                marginVertical: 5,
                marginHorizontal: 10,
                alignItems: 'center',
                opacity: 0.5
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
            
            <View style = {{flex: 4}}>
                <Text style = {styles.flatListText}> {this.props.item.value} </Text>
            </View>
        
            <View  style =  {styles.rightText}>
                <Text style = {styles.lockText}> Lock!</Text>
            </View>

            </View>
            </TouchableOpacity>
            
        )
    }
}



class Level extends Component {
  constructor(props){
    super(props)
    this.state = {
        listData: []
    }
  }
  
  UNSAFE_componentWillMount(){
    //   console.log(this.props.totalLevel)

      let list = this.createListLevel(store.getState().quizData.totalLevel)
      this.setState({
          listData: list
      })
  }

  createListLevel = (numberLoop) => {
    var listLevel = []
    var levelItem = {}
    for( i = 1; i <= numberLoop; i++){
      levelItem = {
        'key': i,
        'value': 'Level '+ i
      }
      listLevel.push(levelItem)
    }
    return listLevel;
  }
  _goBack(){
    this.props.navigation.navigate('RunAwayHome')
    console.log("hhh")}
  
  render() {
    return (
      <View >
        <ImageBackground
        source = {Images.loadingbg}
        style = {{width: '100%', height: '100%'}}
        >
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source = {require('../../Assets/images/select_level.png')}
         style={{
          position: 'absolute',
      }} 

       />
        </View>
        <View style = {{flex: 7}}>
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
        
        <View style = {{flex:1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 15, paddingBottom: 15}}>
       <View style = {{justifyContent: 'flex-end', marginEnd: 0}}>
       <ImageButton
            width = {60}
            height = {60}
            text = ""
            onPress={() => this.props.navigation.navigate('RunAwayHome')}
            source = { Images.back}

          />

       </View>
       </View>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
    return {
       listQuiz: state.quizData.totalLevel
       };
  }
export default connect(mapStateToProps)(Level); 
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
    }
  });