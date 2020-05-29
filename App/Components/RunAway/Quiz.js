import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { handleCorrect, handleInCorrect, plusScore, enableAnswer, disableAnswer, flagWin} from '../../redux/actionCreators';
import Images from '../../Assets/Images'

class Quiz extends Component {
    constructor(pros){
        super(pros);
        this.state = {
            isLoading: true
        }
    }
    _onPress = (choice) => {
        this.props.disableAnswer();
        if (choice == this.props.listQuiz[this.props.index].correctAnswer) {
          this.props.handleCorrect();
          this.props.plusScore();
          if (this.props.index == this.props.listQuiz.length - 1){
            console.log(this.props.index)
            this.props.flagWin();
          }
        }
        else {
          this.props.handleInCorrect();
        }
    }

    render(){
        const index = this.props.index;
        const quiz = this.props.listQuiz[index]; 
        let btn_color
        this.props.userCustom.btn_color ? btn_color = this.props.userCustom.btn_color : btn_color = '#64B5F6'
        const answerBoxRow = {
          flex: 1,
          borderColor: 'blue',
          justifyContent: 'center',
          marginVertical: 1.5,
          marginHorizontal:5,
          textAlign: 'center',
          color: '#ffffff',
          borderRadius: 5,
          backgroundColor: btn_color
        }
        return(
          <ImageBackground
          source = {Images.loadingbg}
          style = {{width: '100%', height: '100%'}}
          >
            <View style = { styles.questionFrame}>
              <View style = { styles.questionBox}>
                <Text style = { styles.textQuestion}>{quiz.question}</Text>  
              </View>
              <View style = { styles.AnswerBox}>
              <View style = { answerBoxRow}>
                <TouchableOpacity
                  disabled = {this.props.isDisable}
                  onPress = {() => this._onPress('a')}> 
                    <Text style = { styles.textContent}>{quiz.a}</Text>
                </TouchableOpacity>
                </View>
                <View style = { answerBoxRow}>
                  <TouchableOpacity
                    disabled = {this.props.isDisable}
                    onPress = {() => this._onPress('b')}> 
                      <Text style = { styles.textContent}>{quiz.b}</Text>
                  </TouchableOpacity>
                </View>
                <View style = {answerBoxRow}>
                  <TouchableOpacity 
                    disabled = {this.props.isDisable}
                    onPress = {() => this._onPress('c')}> 
                      <Text style = { styles.textContent}>{quiz.c}</Text>
                  </TouchableOpacity>
                </View>
                <View style = { answerBoxRow}>
                  <TouchableOpacity 
                    disabled = {this.props.isDisable}
                    onPress = {() => this._onPress('d')}> 
                      <Text style = { styles.textContent}>{quiz.d}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        );
    }
};

function mapStateToProps(state) {
  return {
     index: state.updateIndex,
     isDisable: state.disableAnswer,
     userCustom: state.userCustom,
     };
}

export default connect(mapStateToProps, {handleCorrect, handleInCorrect, plusScore, enableAnswer, disableAnswer, flagWin}) (Quiz);

const styles = StyleSheet.create({
    questionFrame: {
      flex: 1,
      margin: 0,
      padding: 0,
      // backgroundColor: '#ffffff',
      flexDirection : "column",
    },
    questionBox: {
      flex : 2,
      marginHorizontal: 5 ,
      borderColor: 'white',
      justifyContent: 'center',
      // borderWidth: 3,
      borderRadius: 6,
      backgroundColor: '#DC7C9D'
  
    },
    AnswerBox: {
      flex : 4,
      flexDirection : "column",
      marginVertical: 5
    },
    answerBoxRow: {
      flex: 1,
      borderColor: 'blue',
      justifyContent: 'center',
      marginVertical: 1.5,
      marginHorizontal:5,
      // padding: 2,
      // borderWidth: 1,
      textAlign: 'center',
      color: '#ffffff',
      // {store.getState().}
      backgroundColor: '#637cd6', //'#64B5F6',
      borderRadius: 5
    },
    textContent: {
      color: '#ffffff',
      textAlign: 'center',
    },
    textQuestion: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold'
    }
    
  });