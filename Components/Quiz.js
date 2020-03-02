import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

const myQuestions = [
{
    question: "Who invented JavaScript?",
    answers: {
    a: "Douglas Crockford",
    b: "Sheryl Sandberg",
    c: "Brendan Eich",
    d: "xyz"
    },
    correctAnswer: "a"
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
            currentQuestion: 0,
        }
    }

    onPress = (choice) => {
        if (choice != this.state.listQuiz[this.state.currentQuestion].correctAnswer) {
            alert('You long-pressed the button!');
        }
    }
    render(){
        const index = this.state.currentQuestion;
        const quiz = this.state.listQuiz[index];
        return(  
            <View style = { styles.questionFrame}>
              <View style = { styles.questionBox}>
                <Text style = { styles.textQuestion}>{quiz.question}</Text>  
              </View>
              <View style = { styles.AnswerBox}>
              <View style = { styles.answerBoxRow}>
                <TouchableWithoutFeedback  onPress = {this.onPress (quiz.answers.a)}> 
                    <Text style = { styles.textContent}>{quiz.answers.a}</Text>
                </TouchableWithoutFeedback>
                </View>
                <View style = { styles.answerBoxRow}>
                  <Text style = { styles.textContent}>{quiz.answers.b}</Text>
                </View>
                <View style = { styles.answerBoxRow}>
                  <Text style = { styles.textContent}>{quiz.answers.c}</Text>
                </View>
                <View style = { styles.answerBoxRow}>
                  <Text style = { styles.textContent}>{quiz.answers.d}</Text>
                </View>
              </View>
            </View>
        );
    }
};

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
  
  export default Quiz;
