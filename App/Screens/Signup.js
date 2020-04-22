import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
 
} from 'react-native';
import {app} from '../firebaseConfig'
import Spinner from 'react-native-spinkit';
const { width, height } = Dimensions.get("window");

const background = require("../Assets/images/loadingbg.png");
const mark = require("../Assets/images/login_Icon.png");
const lockIcon = require("../Assets/images/login1_lock.png");
const personIcon = require("../Assets/images/login1_person.png");

export default class SignupScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: null,
      email: "",
      password: "" 

    }
  }

  handleSignUp() {
    this.setState({
      loading: true
    })
    if (this.state.email.trim() !== "" && this.state.password.trim() !== ""){
      app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                  console.log("successful")
                  Alert.alert("Sign up successful!")
                })
                .catch(function(error){
                  console.log(error.message)
                  Alert.alert(error.message)
                }
                ).then(() => this.setState({loading: false}))
      
    }
    else {
      Alert.alert(
        "Warning",
        "You have not entered your Email or Password. Please try again!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: true }
      );
      this.setState({ loading: false });
    }
  }
  render() {
    return (     
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholder="Username" 
                placeholderTextColor="#FFF"
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                style={styles.input} 
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput 
                placeholderTextColor="#FFF"
                placeholder="Password" 
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
                style={styles.input} 
                secureTextEntry 
              />
            </View>
            <TouchableOpacity activeOpacity={.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            {
            this.state.loading ?
            <TouchableOpacity activeOpacity={1}>    
              <View style={styles.button}>
              <Spinner type="Circle" size={30} color="white" style={{alignSelf: "center"}}/>
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity activeOpacity={.5} onPress={() => this.handleSignUp()}>    
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            }
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Did you have an account?</Text>
              <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Login')} >
                <View>
                  <Text style={styles.signupLinkText}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "white"
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 30,
    height: 50
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});