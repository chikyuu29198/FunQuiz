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
  Switch

} from 'react-native';
import {ImageButton} from 'react-native-image-button-text';
import Images from '../../Assets/Images'
import Spinner from 'react-native-spinkit';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import store from '../../redux/store'
import CustomConfig from '../../Components/CustomConfig';
import ToggleSwitch from 'toggle-switch-react-native';

const { width, height } = Dimensions.get("window");
const background = require("../../Assets/images/loadingbg.png");
const logo = require("../../Assets/images/Bird.png");

export default class InputKey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      soundStatus: true,
      // soundStatus = store.getState().soundStatus,
      key: ""

    }
  }
  render() {
    return (     
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
          <View style = {styles.container}>
            <View style = {{alignItems: 'center'}}>
              <Image source = {require('../../Assets/images/setting_text.png')}
                      style = {{top: -25}} />
            </View>
            <View>
              <View style = {{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <Text>Sound</Text>
              </View>
            <ToggleSwitch
              isOn={this.state.soundStatus}
              onColor="#f7b705"
              offColor="#ada280"
              label="Example label"
              labelStyle={{ color: "black", fontWeight: "900" }}
              size="medium"
              onToggle={(isOn) => {
                // console.log("aa")
                this.setState({
                  soundStatus : !this.state.soundStatus
                })
              }}
            />
            </View>
            <View>
              
            </View>
          </View>
        </ImageBackground>
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
    marginHorizontal: 30,
    marginVertical: 70,
    backgroundColor: '#7ebcf2',
    borderRadius: 20
  },

})