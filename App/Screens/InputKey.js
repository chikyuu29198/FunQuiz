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
  Keyboard,
  TouchableWithoutFeedback, 
  Alert

} from 'react-native';
import {ImageButton} from 'react-native-image-button-text';
import Images from '../Assets/Images'
import Spinner from 'react-native-spinkit';
const { width, height } = Dimensions.get("window");
const background = require("../Assets/images/loadingbg.png");
const logo = require("../Assets/images/Bird.png");

export default class InputKey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: null,
      key: ""

    }
  }
  handleLoad(){
      this.setState({
          loading: true
      })
  }
  exitPress(){
    Alert.alert(
      //title
      'Cancle loading',
      //body
      'Are you sure you want to cancle ?',
      [
        {text: 'Yes', onPress: () => {}},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  }
  render() {
    return (     
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
          <View style = {styles.container}>
              <View style = {styles.logo}>
                  <View style = {styles.exit}>
                  <ImageButton
                    width = {30}
                    height = {30}
                    paddingRight = {10}
                    text = ""
                    onPress={this.exitPress.bind(this)}
                    source = { Images.exit }                                
                 />
                  </View>                
                <Image source = {logo} style = {styles.logoImg}/>
              </View>
              <View style = {styles.content}>
              <View style = {styles.input}>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Please input key to load quiz data!" 
                autoCapitalize="none"
                onChangeText={key => this.setState({ key })}
                value={this.state.key}
                multiline={true}
                numberOfLines={4}
                style={styles.textInput}
              />
              </View>
              <View style = {styles.button}>
                {
                this.state.loading ?
                <TouchableOpacity >
                    <Spinner type="Circle" size={30} color="white" style={{alignSelf: "center"}}/>
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={.5} onPress={() => this.handleLoad()}>
                    <Text style = { styles.buttonText}>Load</Text>
                </TouchableOpacity>
                }
              </View>
              </View>
              
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
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
    // justifyContent: "center",
    // alignItems: "center"
  },
  exit: {
      flex: 1,
    //   justifyContent: 'center',
    marginLeft: width - 40
  },
  logo: {
      flex: 6,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  content: {
      flex: 12,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 70
  },
  input: {

      justifyContent: 'center',
      alignItems: 'center'
  },
  textInput: {
    //   flex: 1,
      backgroundColor: "black",
      width: width - 40,
      maxHeight: height/7,
      paddingHorizontal: 15,
    //   height: height/6,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   alignContent: 'center'
      opacity: 0.2,
      color: "white",
      borderRadius: 20
  },
  button: {
    backgroundColor: "#FF3366",
    // paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    height: 40,
    width: 90
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  logoImg: {
      width: 90,
      height: 90,
  }

})