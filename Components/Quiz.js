import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { handleCorrect, handleInCorrect, plusScore } from '../redux/actionCreators';
import store from '../redux/store';

const myQuestions = [
{
    question: "Who invented JavaScript?",
    answers: {
    a: "Douglas Crockford",
    b: "Sheryl Sandberg",
    c: "Brendan Eich",
    d: "xyz"
    },
    correctAnswer: "c"
},
{
    question: "Which one of these is a JavaScript package manager?",
    answers: {
    a: "Node.js",
    b: "TypeScript",
    c: "npm",
    d: "xyz",
    },
    correctAnswer: "c"
},
{
    question: "Which tool can you use to ensure code quality?",
    answers: {
    a: "Angular",
    b: "jQuery",
    c: "RequireJS",
    d: "ESLint"
    },
    correctAnswer: "d"
}
];
class Quiz extends Component {
    constructor(pros){
        super(pros);
        this.state = {
            listQuiz: myQuestions,
            // currentQuestion: 0,
            status: null,
        }
    }

    //  let index = this.props.index;
    _onPress = (choice) => {
        if (choice == this.state.listQuiz[this.props.index].correctAnswer) {
          this.props.handleCorrect();
          this.props.plusScore();
        }
        else {
          this.props.handleInCorrect();
        }
    }
    render(){
        const index = this.props.index;
        const quiz = this.state.listQuiz[index];
        return(  
            <View style = { styles.questionFrame}>
              <View style = { styles.questionBox}>
                <Text style = { styles.textQuestion}>{quiz.question}</Text>  
              </View>
              <View style = { styles.AnswerBox}>
              <View style = { styles.answerBoxRow}>
                <TouchableOpacity onPress = {() => this._onPress('a')}> 
                    <Text style = { styles.textContent}>{quiz.answers.a}</Text>
                </TouchableOpacity>
                </View>
                <View style = { styles.answerBoxRow}>
                  <TouchableOpacity onPress = {() => this._onPress('b')}> 
                      <Text style = { styles.textContent}>{quiz.answers.b}</Text>
                  </TouchableOpacity>
                </View>
                <View style = { styles.answerBoxRow}>
                  <TouchableOpacity onPress = {() => this._onPress('c')}> 
                      <Text style = { styles.textContent}>{quiz.answers.c}</Text>
                  </TouchableOpacity>
                </View>
                <View style = { styles.answerBoxRow}>
                  <TouchableOpacity onPress = {() => this._onPress('d')}> 
                      <Text style = { styles.textContent}>{quiz.answers.d}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        );
    }
};

function mapStateToProps(state) {
  return {
     index: state.updateIndex
     };
}

export default connect(mapStateToProps, {handleCorrect, handleInCorrect, plusScore}) (Quiz);

const styles = StyleSheet.create({
    questionFrame: {
      flex: 1,
      backgroundColor: '#ffffff',
      flexDirection : "column",
    },
    questionBox: {
      flex : 2,
      margin: 5 ,
      borderColor: 'gray',
      justifyContent: 'center',
      borderWidth: 3,
      borderRadius: 6,
      backgroundColor: '#DC7C9D'
  
    },
    AnswerBox: {
      flex : 4,
      flexDirection : "column",
    },
    answerBoxRow: {
      flex: 1,
      borderColor: 'blue',
      justifyContent: 'center',
      marginVertical: 1,
      marginHorizontal:5,
      padding: 2,
      borderWidth: 1,
      textAlign: 'center',
      color: '#ffffff',
      backgroundColor: '#64B5F6',
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
  
  
