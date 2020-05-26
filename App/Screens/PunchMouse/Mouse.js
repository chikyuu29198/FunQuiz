import React, {Component} from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageBackground, TouchableHighlight, Text, TouchableWithoutFeedback } from 'react-native';
import Images from '../../Assets/Images.js';
import Constants from './Constants';

export default class Mouse extends Component { 
    constructor (props) {
        super(props);
        // this.isBroke = false

        // this.state = {
        //   isBroke: false
        // }
     }
     async kill(){
        // await this.setState({
        //      isBroke: true
        // //  })
    };

    render() {
        //Math.floor(Math.random() * (40 - 20) + 20);
        const width = this.props.size
        // const height = this.props.size[1];
        const x = this.props.body.position.x - width/2;
        const y = this.props.body.position.y - width/2;
        let img = Images["mouse3" + this.props.pose];
        if (this.props.color == 1)
            img = Images["mouse1" + this.props.pose];
        else if (this.props.color == 2)
            img = Images["mouse2" + this.props.pose];
        else{
            img = Images["mouse3" + this.props.pose];
        };
            
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