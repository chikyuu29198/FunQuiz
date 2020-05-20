import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground
} from 'react-native';
import { GameEngine, dispatch} from 'react-native-game-engine';
import Matter from 'matter-js';
import Constants from '../Components/Constants';
import Bird from '../Components/Bird';
import Physics from '../Components/Physics.js';
import AnswerHandle from '../Components/AnswerHandle.js';
import Images from '../Assets/Images.js';
import Floor from '../Components/Floor';
import MainCharacter from '../Components/MainCharacter';
import Quiz from '../Components/Quiz';
import store  from '../redux/store';
import { Provider } from 'react-redux';
import SettingBar from '../Components/SettingBar';
// import {ImageButton} from 'react-native-image-button-text';

class RunAway extends Component {
  constructor(props){
    super(props);
    this.GameEngine = null;
    this.entities = this.setupWorld();
    this.state = {
      running: true,
      score: 0
    }
  }
  

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    let bird = Matter.Bodies.rectangle( Constants.MAX_WIDTH, 
                                        Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2,
                                        Constants.BIRD_SIZE, 
                                        Constants.BIRD_SIZE, 
                                        { isStatic: true,}                                        
                                        );
                                        
    let mainCharacter = Matter.Bodies.rectangle( Constants.FLOOR_HEIGHT + Constants.MAIN_CHARACTER_SIZE/2, 
                                                 Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.MAIN_CHARACTER_SIZE/2, 
                                                 Constants.MAIN_CHARACTER_SIZE, Constants.MAIN_CHARACTER_SIZE, 
                                                 { isStatic: true },                                                 
                                                );
    let floor1 = Matter.Bodies.rectangle( Constants.MAX_WIDTH/2,
                                          Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT/2, 
                                          Constants.MAX_WIDTH, 
                                          Constants.FLOOR_HEIGHT, 
                                          { isStatic: true });
    let floor2 = Matter.Bodies.rectangle( Constants.MAX_WIDTH*1.5, 
                                          Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT/2, 
                                          Constants.MAX_WIDTH, 
                                          Constants.FLOOR_HEIGHT, 
                                          { isStatic: true });

    Matter.World.add(world, [bird, mainCharacter, floor1, floor2]);

    return {
        physics: { engine: engine, world: world},
        mainCharacter: { body: mainCharacter, pose: 1,size: [Constants.MAIN_CHARACTER_SIZE, Constants.MAIN_CHARACTER_SIZE], renderer: MainCharacter},
        bird: { body: bird, size: [Constants.BIRD_SIZE, Constants.BIRD_SIZE], renderer: Bird},
        floor1: { body: floor1, size: [Constants.FLOOR_HEIGHT, Constants.MAX_WIDTH], renderer: Floor },
        floor2: { body: floor2, size: [Constants.FLOOR_HEIGHT, Constants.MAX_WIDTH], renderer: Floor },
    }
  }
  handleEvent = (ev) => {
		if (ev.type === "game-over")
			this.setState({
        running: false
      });
    else if (ev.type === "score")
      this.setState({
        score: this.state.score + 1
      })
    else if (ev.type === "reset-game"){    
      // this.refs.engine.swap(setupWorld());
      store.dispatch({type: 'RESET_INDEX'});
      this.GameEngine.swap(this.setupWorld());
      this.setState({
        running: true
       });  
    }  
  };
  
  reset = () => {
    store.dispatch({type: 'ENABLE_ANSWER'})
    store.dispatch({type: 'RESET_INDEX'});
    store.dispatch({type: 'UNFLAGGED_WIN'})
    this.GameEngine.swap(this.setupWorld());
    this.setState({
        running: true,
        score: 0
    });
  };

  next = () => {
    store.dispatch({type: 'ENABLE_ANSWER'})
    store.dispatch({type: 'RESET_INDEX'});
    store.dispatch({type: 'UPDATE_LEVEL'})
    store.dispatch({type: 'UNFLAGGED_WIN'})
    this.GameEngine.swap(this.setupWorld());
    this.setState({
        running: true,
        score: 0
    });
  }

  render(){
    let imgSource
    store.getState().userCustom.background ? imgSource = {uri: store.getState().userCustom.background} : imgSource = Images.gameBackground
    return(
      <Provider store = { store }>
       <ImageBackground
          source = {Images.loadingbg}
          style = {{width: '100%', height: '100%'}}
          >
      <View style = {styles.container}>
        <View style = {styles.gameEngine}>
          <Image
            source={imgSource}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: Constants.MAX_WIDTH,
              height: Constants.MAX_HEIGHT,
          }} 
          resizeMode="stretch"
            />
          <GameEngine
            ref={(ref)=> {this.GameEngine = ref;}}
            style = {styles.gameContainer} 
            systems = {[Physics,AnswerHandle]}
            entities = {this.entities}
            running = {this.state.running}
            onEvent = {this.handleEvent}
            status = {this.status}
            >
            <StatusBar hidden={true} />
          </GameEngine>   
          < Text style = { styles.score }> {this.state.score} </Text>
          < SettingBar navigation = {this.props.navigation} />
        </View>

        <View style = { styles.questionFrame}>
            <Quiz  listQuiz ={this.props.navigation.state.params.data}/>
        </View>
        {this.state.running == false ?
           store.getState().winFlag == false ? 
          <TouchableOpacity style={styles.fullScreenButton}>
            <View style={styles.fullScreen}>
              <View style = {styles.contentComponent}>
                <View style = {{alignItems: 'center'}}> 
                  <Text style={styles.gameOverText}>Game Over</Text>
                  <Text style = {styles.contentText} > {'Score:    ' + this.state.score} </Text>
                  <Text style = {styles.contentText} > {'Level:    ' + store.getState().level.currentLevel} </Text>
            
                </View>
              
              <View style = { styles.functionButton}>
                <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Level')}>    
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>BACK</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} onPress={() => this.reset()}>    
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>RETRY</Text>
                  </View>
                </TouchableOpacity>             
              </View>
              </View>
            </View>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.fullScreenButton}>
            <View style={styles.fullScreen}>
              <View style = {styles.contentComponent}>
                <View style = {{alignItems: 'center'}}> 
                  <Text style={styles.gameOverText}> { store.getState().level.currentLevel < store.getState().quizData.totalLevel ? 'Level Up' : 'Completed!' }</Text>
                  <Text style = {styles.contentText} > {'Score:    ' + this.state.score} </Text>
                  <Text style = {styles.contentText} > {'Level:    ' + store.getState().level.currentLevel} </Text>
            
                </View>
              
              <View style = { styles.functionButton}>
                <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Level')}>    
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>BACK</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} onPress={() => { store.getState().level.currentLevel < store.getState().quizData.totalLevel ? this.next() : this.reset()}}>    
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>{ store.getState().level.currentLevel < store.getState().quizData.totalLevel ? 'NEXT' : 'RETRY' }</Text>
                  </View>
                </TouchableOpacity>             
              </View>
              </View>
            </View>
            </TouchableOpacity>
            :
            <View></View>
              }

      </View>
      </ImageBackground>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : "column",
    // backgroundColor: '#ffffff',
  },
  gameEngine: {
    margin: 0,
    flex: 5,
  },
  questionFrame: {
    margin: 0,
    padding: 0,
    flex: 4,
    backgroundColor: '#ffffff',
    flexDirection : "column",
  },
  gameOverText: {
    color: '#2e0f05',
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: 'sans-serif',
    textShadowColor: 'white',
    textShadowOffset: {width: -5, height: 5},
    textShadowRadius: 20,
    shadowOpacity: 1,
    marginTop: 15
},
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  score: {
    position: "absolute",
    top: 5,
    left: Constants.MAX_WIDTH/2 - 15,
    fontSize: 40,
    color: '#DC7C9D',
    fontFamily: 'lucida grande',
    fontWeight: "bold",
    textShadowColor: '#444444',
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2}
  },
  settingBar: {
    position: "absolute",
    top: 5,
    width: 50,
    height: 20,
    left: Constants.MAX_WIDTH - 50,
    backgroundColor: 'black',
    opacity: 0.8
  },
  functionButton: {
    flexDirection: 'row',
    // marginHorizontal: 30,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: 'center'
  },
  contentComponent: {
    width: Constants.MAX_WIDTH/5*4,
    height: Constants.MAX_HEIGHT/6*5,
    backgroundColor: '#ffd633',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 5

  },
  contentText: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    marginVertical: 5
  },
  button: {
    width: 90,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: '#2e0f05',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    // marginEnd : 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: "bold"
  }
  
});

export default RunAway;
