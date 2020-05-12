import React, { Component } from "react";
import { View , Text, StyleSheet } from "react-native";
import Images from '../Assets/Images';
import Constants from './Constants';
import store from '../redux/store';
import { connect } from 'react-redux';
import { ImageButton } from "react-native-image-button-text";

class GameOver extends Component {
    render() {
        return (
         <View style = {styles.contaniner}>
            <View style = {{alignItems: 'center', justifyContent: "center"}}>
                <Text style = {styles.gameOverText}>Game Over!</Text>
                <Text>{'Score:\t12'}</Text>
                <Text>{'Level:\t1'}</Text>
            </View>
            <View style = {{flexDirection: "row"}}>
            <View>
                <ImageButton
                     width = {100}
                     height = {45}
                     paddingRight = {0}
                     fontSize={20}
                     textColor="white"
                     text = "Go Back"
                     source = { Images.purpleButton}
                />
                
             </View>
             <View>
             <ImageButton
                     width = {100}
                     height = {38}
                     paddingRight = {0}
                     fontSize={20}
                     text = "Try Again"
                     textColor="white"
                     borderRadius =  {10}
                     source = { Images.purpleButton}
                />
             </View>
            </View>                 
         </View>   
    );
  }
}

export default GameOver;

const styles = StyleSheet.create({
    contaniner: {
        width: Constants.MAX_WIDTH/5*4,
        height: Constants.MAX_HEIGHT/5*3,
        // flex: 1,
        flexDirection: "column",
        backgroundColor: 'blue',
        borderColor: 'yellow',
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center"
        
    },
    gameOverText: {
        color: 'yellow',
        fontSize: 40
    },
    leftComponent: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'center'
    },
    rightComponent: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'center'
    }
   
})