import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import Constants from './Components/Constants';
import { GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import Bird from './Components/Bird';
import Wall from './Components/Wall';
import Physics from './Components/Physics.js';
import AnswerHandle from './Components/AnswerHandle.js';
import Images from './Assets/Images.js';
import Floor from './Components/Floor';
import MainCharacter from './Components/MainCharacter';
import Quiz from './Components/Quiz';
import store  from './redux/store';
import { Provider } from 'react-redux';

export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generatePipes = () => {
  let topPipeHeight = randomBetween(100, (Constants.MAX_HEIGHT / 2) - 100);
  let bottomPipeHeight = Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;

  let sizes = [topPipeHeight, bottomPipeHeight]

  if (Math.random() < 0.5) {
      sizes = sizes.reverse();
  }


  return sizes;
}

class App extends Component {
  constructor(props){
    super(props);
    this.GameEngine = null;
    this.entities = this.setupWorld();
    // this.isCorrect = null;

  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.5;
    let bird = Matter.Bodies.rectangle( Constants.MAX_WIDTH, 
                                        Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2,
                                        Constants.BIRD_SIZE, 
                                        Constants.BIRD_SIZE, 
                                        { isStatic: true },
                                        { friction : 1},
                                        { frictionAir: 1})
    let mainCharacter = Matter.Bodies.rectangle( Constants.FLOOR_HEIGHT + Constants.MAIN_CHARACTER_SIZE/2, 
                                                 Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.MAIN_CHARACTER_SIZE/2, 
                                                 Constants.MAIN_CHARACTER_SIZE, Constants.MAIN_CHARACTER_SIZE, 
                                                 { isStatic: false },
                                                 { friction : 1},
                                                 { frictionAir: 1}
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
    // let ceiling = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, 
    //                                         25, Constants.MAX_WIDTH, Constants.FLOOR_HEIGHT, { isStatic: true });

    Matter.World.add(world, [bird, mainCharacter, floor1, floor2]);

    return {
        physics: { engine: engine, world: world},
        mainCharacter: { body: mainCharacter, pose: 1,size: [Constants.MAIN_CHARACTER_SIZE, Constants.MAIN_CHARACTER_SIZE], renderer: MainCharacter},
        bird: { body: bird, size: [Constants.BIRD_SIZE, Constants.BIRD_SIZE], renderer: Bird},
        floor1: { body: floor1, size: [Constants.FLOOR_HEIGHT, Constants.MAX_WIDTH], renderer: Floor },
        floor2: { body: floor2, size: [Constants.FLOOR_HEIGHT, Constants.MAX_WIDTH], renderer: Floor },
        // ceiling: { body: ceiling, size: [Constants.MAX_WIDTH, Constants.FLOOR_HEIGHT], color: "green", renderer: Wall },
    }
}
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
            status = {this.status}
            >
          </GameEngine>   
          
        </View>

        <View style = { styles.questionFrame}>
            <Quiz />
        </View>
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
  }
  
});

export default App;
