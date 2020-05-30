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
import Constants from '../../Components/PuchMouse/Constants';
import Mouse from '../../Components/PuchMouse/Mouse';
import Cake from '../../Components/PuchMouse/Cake'
import Physics from '../../Components/PuchMouse/Physics';
import Porcupine from '../../Components/PuchMouse/Porcupine'
// import AnswerHandle from '../Components/AnswerHandle.js';
import Images from '../../Assets/Images.js';
import Quiz from '../../Components/PuchMouse/Quiz';
import { Provider } from 'react-redux';
import SettingBar from '../../Components/PuchMouse/SettingBar';
import store from '../../redux/store';
// import {ImageButton} from 'react-native-image-button-text';

class PunchMouseGameWorld extends Component {
  constructor(props){
    super(props);
    this.GameEngine = null;
    this.entities = this.setupWorld();
    this.updateRuningStatus = this.updateRuningStatus.bind(this);
    this.state = {
      running: true,
      score: 0,
      // listQuiz: this.props.navigation.state.params.data
      // pausing: store.getState().pausing
    }
  }
  

  setupWorld = () => {
    console.log(this + 'this')
    let numberOfQuiz = this.props.navigation.state.params.data.length
    // let numberOfQuiz = () => { return this.state.listQuiz.length }
    console.log(numberOfQuiz + "test numberOfQuiz")
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    let mouse_list = []
    for (i = 0; i<13; i++){
      let x = Math.floor(Math.random() * (Constants.MAX_WIDTH - 0 + 1) ) + 0;
      let y = Math.floor(Math.random() * (Constants.MAX_HEIGHT - 0 + 1) ) + 0;
      let width = Math.floor(Math.random() * (60 - 50 + 1) ) + 50;
      var mouse = Matter.Bodies.rectangle( x, 
                                           y,
                                          width, 
                                          width, 
                                          { isStatic: true,}                                        
                                          );
      mouse_list.push(mouse);
    }
                                        
    let cake = Matter.Bodies.rectangle( Constants.MAX_WIDTH/2, 
                                                 Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.CAKE_SIZE/2, 
                                                 Constants.CAKE_SIZE, Constants.CAKE_SIZE, 
                                                 { isStatic: true },                                                 
                                                );
    let porcupine_list = []
    for (i = 0; i<numberOfQuiz; i++){
      let x = Math.floor(Math.random() * (Constants.MAX_WIDTH - 0 + 1) ) + 0;
      let y = Math.floor(Math.random() * (Constants.MAX_HEIGHT - 0 + 1) ) + 0;
      let width = 60;
      var porcupine = Matter.Bodies.rectangle( x, 
                                            y,
                                          width, 
                                          width, 
                                          { isStatic: true,}                                        
                                          );
      porcupine_list.push(porcupine);
    }
    // mouse_list.push(cake)
    let entity_list = mouse_list.concat(porcupine_list)
    entity_list.push(cake)

    // console.log(mouse_list)
    Matter.World.add(world, entity_list);
    let game_world = {physics: { engine: engine, world: world},
    cake: { body: cake, size: [Constants.BIRD_SIZE, Constants.BIRD_SIZE], renderer: Cake},
  }
    for (i = 0; i<mouse_list.length; i++){
      let _pose = Math.floor(Math.random() * (3 - 1 + 1) ) + 1
      let key = 'mouse' + i;
      let _size = Math.floor(Math.random() * (60 - 40 + 1) ) + 40
      let _color = Math.floor(Math.random() * (3 - 1 + 1) ) + 1
      let _speed = Math.floor(Math.random() * (5 - 2 + 1) ) + 2
      game_world[key] = {body: mouse_list[i], isBroke: false, pose: _pose, size: _size, color: _color, speed: _speed, renderer: Mouse}
    }
    for (i = 0; i<porcupine_list.length; i++){
      let key = 'porcupine' + i;
      game_world[key] = {body: porcupine_list[i], size: 60, speed: 7, renderer: Porcupine}
    }
    return game_world
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
    else if (ev.type === "pause"){ 
      // console.log(store.getState().pausing)   
      this.setState({
        running: false,
      });
    }  
  };

  updateRuningStatus(){
    this.setState({
      running: true
    })
    console.log("runing: " + this.state.running)
  }

  plusScore = () =>{
    console.log(this.state.score + " Score test")
    this.setState({
      score: this.state.score + 10
    })
  }

  render(){
    return(
      <Provider store = { store }>
       <ImageBackground
          source = {Images.woodFloor}
          style = {{width: '100%', height: '100%'}}
          >
      <View style = {styles.container}>
        <View style = {styles.gameEngine}>
          <GameEngine
            ref={(ref)=> {this.GameEngine = ref;}}
            style = {styles.gameContainer} 
            systems = {[Physics]}
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

      {this.state.running == false && <Quiz plusScore = {this.plusScore} updateRuningStatus = {this.updateRuningStatus} listQuiz = {this.props.navigation.state.params.data} />}
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

export default PunchMouseGameWorld;
