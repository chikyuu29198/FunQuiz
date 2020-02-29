import React, {Component} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Images from '../Assets/Images.js';
import Constants from './Constants';

export default class Bird extends Component { 
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width;
        const y = this.props.body.position.y + height;
        return (
            <Image
                style={{
                    position: 'absolute',
                    top: y,
                    left: x,
                    width: width,
                    height: height,
                }} 
                resizeMode="stretch"
                source={Images.bird}
            
            />             
               
        )
    }
}