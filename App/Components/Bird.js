import React, {Component} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Images from '../Assets/Images.js';
import Constants from './Constants';

export default class Bird extends Component { 
    constructor (props) {
        super(props)
        this.state = {
          isRun: true
        }
     }
   
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width/2;
        const y = this.props.body.position.y - height/2;
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