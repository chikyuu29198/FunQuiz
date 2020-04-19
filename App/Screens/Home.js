import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Sound from 'react-native-sound'
import Sounds from '../Assets/Sounds.js'
import store from '../redux/store'
import Spinner from 'react-native-spinkit'
import axios from 'axios';
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
    store.dispatch({type: 'GET_DATA', data: data_geted.data})
    // store.dispatch({ type: 'GET_LEVEL', data: data_geted.data[data_geted.data.length - 1].level})
    console.log(data_geted)
    console.log(data_geted.data[data_geted.data.length - 1].level)
        // .then((res) => {
        //   console.log(res.data)
        //   store.dispatch({type: 'GET_DATA', data: res.data})
        // }).catch(err => console.log(err));
    }

    _onPress = async () => {
    this.setState({
      isSPinner: true
    })
    await this.getData()
    console.log(store.getState.quizData)
    if(store.getState().quizData.length != 0){
    this.setState({isSPinner: false})
    this.props.navigation.navigate('RunAway')
    
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