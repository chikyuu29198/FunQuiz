import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Animated,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { handleCorrect, handleInCorrect, reset, updateIndex, enableAnswer, disableAnswer, flagWin, unPause} from '../../redux/actionCreators';
import Images from '../../Assets/Images'
import store from '../../redux/store';
import Constants from './Constants';

class Quiz extends Component {
    constructor(pros){
        super(pros);
        this.state = {
            isLoading: true,
            progressStatus: 0,
            timeout: false
            // isCorrect: null,
        }
    }
    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    _onPress = (choice) => {
      this.props.disableAnswer();
        if (choice == this.props.listQuiz[this.props.index].correctAnswer){
            this.props.updateIndex();
            this.props.handleCorrect();
            this.props.plusScore();
            console.log("plus score in punch quiz " + store.getState.plusScore)
             setTimeout(() => {  
              this.props.updateRuningStatus();
              console.log("is pause: " + store.getState().pausing)
              }, 500);
            console.log("is correct: " + this.props.isCorrect)
            if (this.props.index == this.props.listQuiz.length - 1){
              console.log(this.props.index)
              this.props.flagWin();
            }
        }
        else{
            this.props.handleInCorrect();
            setTimeout(() => {  
              this.props.updateRuningStatus();
              console.log("is pause: " + store.getState().pausing)
              this.props.gameOverHandle();
              }, 500);
        }
        
    }
    UNSAFE_componentWillMount(){
      this.props.reset();
      this.props.enableAnswer();
      console.log("test ntn: "+store.getState().userCustom.btn_color)
    }
    anim = new Animated.Value(0);  
    componentDidMount(){  
        this.onAnimate();  
    }  
    componentDidUpdate(prevState) {
      if (prevState.progressStatus !== this.state.progressStatus) {
          if (this.state.progressStatus == 100 ) {
            setTimeout(() => {  
              this.props.gameOverHandle();
              }, 500);
          }
      }
    }
    onAnimate = () =>{  
        this.anim.addListener(({value})=> {  
            this.setState({progressStatus: parseInt(value,10)});  
        });  
        Animated.timing(this.anim,{  
             toValue: 100,  
             duration: 10000,  
        }).start();  
    }  

    render(){
        const index = this.props.index;
        const quiz = this.props.listQuiz[index]; 
        let btn_color
        this.props.userCustom.btn_color ? btn_color = this.props.userCustom.btn_color : btn_color = '#64B5F6'
      // let btn_color = '#64B5F6'
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
          style = {{width: '100%', height: '100%', opacity: 0.8}}
          >
            {
               this.props.isCorrect == null ?
                this.state.progressStatus < 100 ?
             <View style = { styles.questionFrame}>
              <View style = {{flex: 1, justifyContent: 'flex-end', paddingBottom: 20}}>
             <Animated.View  
                style={[  
                    styles.inner,{width: this.state.progressStatus +"%"},  
                ]}  
            />  
              </View>
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
            :
            <View  style = {{flex: 1, justifyContent: "center", alignItems: 'center'}}>
            <Image
             style = {styles.textImage}
             source = {require('../../Assets/images/timeoutText.png')}
           />
            <Image
             style = {styles.Image}
             source = {require('../../Assets/images/cryingImage.png')}
           />
       </View>
            :
               this.props.isCorrect == true ?
                        <View style = {{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                            <Image
                              style = {styles.textImage}
                              source = {require('../../Assets/images/correctText.png')}
                            />
                             <Image
                              style = {styles.Image}
                              source = {require('../../Assets/images/smileImage.png')}
                            />
                        </View>
                        :
                        <View  style = {{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                             <Image
                              style = {styles.textImage}
                              source = {require('../../Assets/images/incorrectText.png')}
                            />
                             <Image
                              style = {styles.Image}
                              source = {require('../../Assets/images/cryingImage.png')}
                            />
                        </View>
            }
          </ImageBackground>
        );
    }
};

function mapStateToProps(state) {
  return {
     index: state.updateIndex,
     isDisable: state.disableAnswer,
     userCustom: state.userCustom,
     isCorrect: state.isCorrect
     };
}

export default connect(mapStateToProps, {handleCorrect, reset, handleInCorrect, updateIndex, enableAnswer, disableAnswer, flagWin, unPause}) (Quiz);

const styles = StyleSheet.create({
    questionFrame: {
      flex: 1,
      marginHorizontal: 30,
      marginVertical: 50,
      padding: 0,
      // backgroundColor: '#ffffff',
      flexDirection : "column",
    },
    questionBox: {
      flex : 1.5,
      // marginHorizontal: 25 ,
      borderColor: 'white',
      justifyContent: 'center',
      borderWidth: 3,
      borderRadius: 6,
      backgroundColor: '#DC7C9D'
  
    },
    AnswerBox: {
      flex : 4,
      flexDirection : "column",
      marginVertical: 25
    },
    answerBoxRow: {
      flex: 1,
      borderColor: 'blue',
      justifyContent: 'center',
      marginVertical: 1.5,
      marginHorizontal:5,
      borderWidth: 1,
      textAlign: 'center',
      color: '#ffffff',
      backgroundColor: '#637cd6',
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
    },
    inner:{  
      width: "100%",  
      height: 10,  
      borderRadius: 10,  
      backgroundColor:"#f2a007",  
    },  
    textImage: {
      width: 220,
      height: 50,
      marginVertical: 20
    },
    Image: {
      width: 100,
      height: 100,
    }
  });