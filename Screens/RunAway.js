import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar
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
import SettingBar from '../Components/SettingBar'

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
    world.gravity.y = 1;
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
    // let score = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, 
    //                                         25, 80, 30, { isStatic: true });

    Matter.World.add(world, [bird, mainCharacter, floor1, floor2]);

    return {
        physics: { engine: engine, world: world},
        mainCharacter: { body: mainCharacter, pose: 1,size: [Constants.MAIN_CHARACTER_SIZE, Constants.MAIN_CHARACTER_SIZE], renderer: MainCharacter},
        bird: { body: bird, size: [Constants.BIRD_SIZE, Constants.BIRD_SIZE], renderer: Bird},
        floor1: { body: floor1, size: [Constants.FLOOR_HEIGHT, Constants.MAX_WIDTH], renderer: Floor },
        floor2: { body: floor2, size: [Constants.FLOOR_HEIGHT, Constants.MAX_WIDTH], renderer: Floor },
        // score: { body: score, size: [80, 30], renderer: Score },
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
      this.refs.engine.swap(setupWorld());
      this.setState({
        running: true
    });
    }  
  };
  
  reset = () => {
    this.GameEngine.swap(this.setupWorld());
    // this.entities = this.setupWorld();
    this.setState({
        running: true
    });
    // dispatch({ type: "reset-game"})
  };

  render(){
    return(
      <Provider store = { store }>
      <View style = {styles.container}>
        <View style = {styles.gameEngine}>
          <Image
            source={Images.gameBackground}
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
          < SettingBar />
        </View>

        <View style = { styles.questionFrame}>
            <Quiz />
        </View>
        {!this.state.running && 
          <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>Game Over</Text>
              
            </View>
            </TouchableOpacity>}
      </View>
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
    flex: 5,
  },
  questionFrame: {
    flex: 4,
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
  },
  gameOverText: {
    color: 'white',
    fontSize: 48
},
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
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
    width: 40,
    height: 20,
    left: Constants.MAX_WIDTH - 50,
    backgroundColor: 'black',
    opacity: 0.8
  },
  
});

export default RunAway;
