import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Sound from 'react-native-sound'
import Sounds from '../Assets/Sounds.js'
import store from '../redux/store'
import Spinner from 'react-native-spinkit'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from './Loading.js';
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

    const data_geted = await axios.get('http://e9d2a563.ngrok.io', {
      params : {
        key: '11uGBq9i-C4nOiyxNyco1j9gPEq1HYPuDlFpquf6rvSw'
      }
    })
    console.log(data_geted)
    store.dispatch({type: 'GET_DATA', listQuiz: data_geted.data, totalLevel: data_geted.data[data_geted.data.length - 1].level})
    const data = JSON.stringify(data_geted.data)
    await AsyncStorage.setItem('quizData', data)
    }

    _onPress = async () => {
    console.log(store.getState().quizData.totalLevel)
    let data =  await AsyncStorage.getItem('quizData')
    data = (data == null) ? [] : JSON.parse(data)
    if (store.getState().quizData.listQuiz.length == 0){
      if (data.length != 0){
        console.log("have local data")
        console.log(data[data.length - 1].level)
        await store.dispatch({type: 'GET_DATA', listQuiz: data, totalLevel: data[data.length - 1].level})
        test = await store.getState().quizData.listQuiz
       console.log( " lenght " + test.length)
        if(test.length != 0){ this.props.navigation.navigate('Level')}
      }
      else{
        console.log("NOT")
        this.props.navigation.navigate('InputKey')
        // this.setState({
        //   isSPinner: true
        // })
        // await this.getData()
        // if(store.getState().quizData.listQuiz.length != 0){
        // this.setState({isSPinner: false})
        // this.props.navigation.navigate('Level')
        // }   
    }
  }
    else {
      console.log("done")
      this.props.navigation.navigate('Level')
      
    }
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