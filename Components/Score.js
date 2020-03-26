import React, { Component } from "react";
import { View , Text, StyleSheet } from "react-native";
import Images from '../Assets/Images';
import Constants from './Constants';
import store from '../redux/store';
import { connect } from 'react-redux';

class Score extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width/2;
        const y = this.props.body.position.y - height/2;
        const score = this.props.score;
        return (
            <View
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    backgroundColor: 'DC7C9D'
                }} >
                <View style = { styles.scoreFrame }>
                    <Text style = { styles.scoreText }>Score: </Text>
                    <Text style = { styles.scoreText }> {score} </Text>
                </View>
            </View>
    );
  }
}
function mapStateToProps(state) {
    return { 
        score: state.plusScore
    };
}
export default connect(mapStateToProps)(Score);

const styles = StyleSheet.create({
    scoreFrame: {
      flex: 1,
      flexDirection : "row",
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: '#f2e5b6',
      borderColor: 'gray',
    },
    scoreText: {
        color: '#234ae8',
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    }
})