import React, {Component} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Images from '../../Assets/Images.js';
import Constants from './Constants';

export default class Mouse extends Component { 
    constructor (props) {
        super(props)
        this.state = {
          isRun: true
        }
     }
   
    render() {
        //Math.floor(Math.random() * (40 - 20) + 20);
        const width = 40
        // const height = this.props.size[1];
        const x = this.props.body.position.x - width/2;
        const y = this.props.body.position.y - width/2;
        let img = Images["mouse1" + this.props.pose];
        return (
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
               
        )
    }
}