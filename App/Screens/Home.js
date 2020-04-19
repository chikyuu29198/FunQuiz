import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Sound from 'react-native-sound'
import Sounds from '../Assets/Sounds.js'
import store from '../redux/store'
import Spinner from 'react-native-spinkit'
import axios from 'axios';
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
    axios.get('http://192.168.1.80:5000/api')
        .then((res) => {
          console.log(res.data)
          store.dispatch({type: 'GET_DATA', data: res.data})
        }).catch(err => console.log(err));
  }

  _onPress = () => {
    this.setState({
      isSPinner: true
    })
    this.getData()
    console.log(store.quizData)
    if(store.getState().quizData.length != 0)
    this.props.navigation.navigate('RunAway')
  }

  render() {
    return (
      this.state.isSPinner ?
      <View>
        <Spinner type="WanderingCubes" size={30} color="green" style={{alignSelf: "center"}}/>
      </View>
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
  });
export default Home; 