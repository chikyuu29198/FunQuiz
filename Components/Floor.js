import React, { Component } from "react";
import { View , StyleSheet, Image, ScrollView} from "react-native";
import Images from '../Assets/Images';
import Constants from './Constants';

export default class Floor extends Component {
    render() {
        const width = this.props.size[1];
        const height = this.props.size[0];
        const x = this.props.body.position.x + width/2;
        const y = this.props.body.position.y - height/2;
        return (
            <View
                style={{
                    // flex: 1,
                    // position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                }} >
                <Image 
                source = {Images.Floor}
                style = {{ 
                    // position: 'relative',
                    // width: width,
                    height: height,
                    resizeMode : 'repeat',
                   }}
                
                />
            </View>
    );
  }
}