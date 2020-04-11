import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../Assets/Images';
import Constants from '../Components/Constants';

class SettingBar extends Component {
    constructor(props){
        super(props);
        this.state = {
          isMute: false,
        }
      }
    
    changeSoundIcon(){
        this.setState({
            isMute: !this.state.isMute
        })
        console.log(this.state.isMute)
    }
    
  render() {
    return (
      <View style={styles.statusBar}>
        <TouchableOpacity style = {styles.settingBar}>
        <Image 
            style={{
              position: 'absolute',
              width: "100%",
              height: "100%",
          }} 
          resizeMode="stretch"
          source={ this.state.isMute == true ?                  
          Images.mute : 
          Images.speaker}  
          />        
       </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    settingBar: {
      position: "absolute",
      top: 5,
      width: 50,
      height: 20,
      left: Constants.MAX_WIDTH -60,
      // backgroundColor: 'black',
      opacity: 0.5
    },
  });
export default SettingBar; 