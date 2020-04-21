import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Sound from 'react-native-sound'
import Sounds from '../Assets/Sounds.js'
import store from '../redux/store'
import Spinner from 'react-native-spinkit'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../Components/Loading.js';
Sound.setCategory('Ambient')

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      isSPinner : null,
      data : []
    }
  }
  async getData (){

    const data_geted = await axios.get('http://192.168.1.80:5000/api')
    store.dispatch({type: 'GET_DATA', listQuiz: data_geted.data, totalLevel: data_geted.data[data_geted.data.length - 1].level})
    const data = JSON.stringify(data_geted.data)
    // console.log(data)
    await AsyncStorage.setItem('quizData', data)
    // store.dispatch({ type: 'GET_LEVEL', data: data_geted.data[data_geted.data.length - 1].level})
    // console.log(data_geted)
    // console.log(data_geted.data[data_geted.data.length - 1].level)
        // .then((res) => {
        //   console.log(res.data)
        //   store.dispatch({type: 'GET_DATA', data: res.data})
        // }).catch(err => console.log(err));
    }

    _onPress = async () => {
    let data =  await AsyncStorage.getItem('quizData')
    // console.log(data)
    if (store.getState().quizData.listQuiz.length == 0){
      if (data.length != 0){
        console.log("have local data")
        // console.log(data)
        // let data =  await AsyncStorage.getItem('quizData')
        await store.dispatch({type: 'GET_DATA', listQuiz: data, totalLevel: data[data.length - 1].level})
        test = await store.getState().quizData.listQuiz
       console.log( " lenght " + test.length)
        if(test.length != 0){ this.props.navigation.navigate('RunAway')}
      }
      else{
        console.log("NOT")
        this.setState({
          isSPinner: true
        })
        await this.getData()
        
                    // .then((value) => {

                    //   console.log(value)
                    // })
        // console.log(store.getState().quizData.totalLevel)
        if(store.getState().quizData.listQuiz.length != 0){
        this.setState({isSPinner: false})
        this.props.navigation.navigate('RunAway')
        }   
    }
  }
    else {
      console.log("done")
      this.props.navigation.navigate('RunAway')
      
    }
  }

  createListLevel = (number_list) => {
    var listLevel = []
    var levelItem = {}
    for( i = 1; i <= number_list; i++){
      levelItem = {
        key: i,
        value: i
      }
      listLevel.push(levelItem)
    }
    return listLevel;
  }

  render() {
    return (
      this.state.isSPinner ?
      <Loading/>
      :
      <View style={styles.container}>
        <Text>Play Game!</Text>
        <Button
          title="Start Game"
          onPress={() =>
            this._onPress()    
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
export default Home; 