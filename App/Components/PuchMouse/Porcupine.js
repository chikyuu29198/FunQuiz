import React, {Component} from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageBackground, TouchableHighlight, Text, TouchableWithoutFeedback } from 'react-native';
import Images from '../../Assets/Images.js';
import Constants from './Constants';

export default class Porcupine extends Component { 
    constructor (props) {
        super(props);
     }
     async kill(){
    };

    render() {
        const width = this.props.size
        const x = this.props.body.position.x - width/2;
        const y = this.props.body.position.y - width/2;
        let img = Images.porcupine;
            
        return (
            <TouchableWithoutFeedback onPress = {() => {this.kill()
            }} style = {{ position: 'absolute',
            top: y,
            left: x,
            width: width,
            height: width,}}>
                <Image
                style={{
                    position: 'absolute',
                    top: y,
                    left: x,
                    width: width,
                    height: width,
                }} 
                resizeMode="stretch"
                source={img}
            />
            </TouchableWithoutFeedback>
               
        )
    }
}