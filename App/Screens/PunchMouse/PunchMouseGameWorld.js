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
import AsyncStorage from '@react-native-community/async-storage';
// import {ImageButton} from 'react-native-image-button-text';

class PunchMouseGameWorld extends Component {
  constructor(props){
    super(props);
    this.GameEngine = null;
    this.updateRuningStatus = this.updateRuningStatus.bind(this);
    this.state = {
      running: true,
      score: 0,
      gameOver: false,
      target: 0,
      listQuiz: this.props.navigation.state.params.data
      // pausing: store.getState().pausing
    }
    this.entities = this.setupWorld();
  }
  
  
  UNSAFE_componentWillMount = () => {
    let numberOfQuiz = this.state.listQuiz.length;
    let _target =numberOfQuiz*10 + store.getState().level.currentLevel*5 + 40
    this.setState({
      target: _target
    })
  }
  setupWorld() {
    let numberOfQuiz = this.state.listQuiz.length;
    let numberOfMouse = store.getState().level.currentLevel*5 + 40
    console.log(numberOfQuiz + "test numberOfQuiz")
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    let mouse_list = []
    for (i = 0; i<numberOfMouse; i++){
      let x = Math.floor(Math.random() * (Constants.MAX_WIDTH - 0 + 1) ) + 0;
      let y = - Math.floor(Math.random() * (Constants.MAX_HEIGHT*2 - 0 + 1) ) + 0;
      let width = Math.floor(Math.random() * (70 - 50 + 1) ) + 50;
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
      let y = -(Math.floor(Math.random() * (Constants.MAX_HEIGHT*2 - 0 + 1) ) + Constants.MAX_HEIGHT/2);
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
    cake: { body: cake, pose: 1, size: [Constants.BIRD_SIZE, Constants.BIRD_SIZE], renderer: Cake},
  }
    for (i = 0; i<mouse_list.length; i++){
      let _pose = Math.floor(Math.random() * (3 - 1 + 1) ) + 1
      let key = 'mouse' + i;
      let _size = Math.floor(Math.random() * (60 - 40 + 1) ) + 40
      let _color = Math.floor(Math.random() * (3 - 1 + 1) ) + 1
      let _speed = Math.floor(Math.random() * (9 - 5 + 1) ) + 5
      game_world[key] = {body: mouse_list[i], isBroke: false, pose: _pose, size: _size, color: _color, speed: _speed, renderer: Mouse}
    }
    for (i = 0; i<porcupine_list.length; i++){
      let key = 'porcupine' + i;
      game_world[key] = {body: porcupine_list[i], size: 60, pose: 0, speed: 9, renderer: Porcupine}
    }
    return game_world
  }

  handleEvent = (ev) => {
		if (ev.type === "game-over")
			this.setState({
        running: false,
        gameOver: true
      });
    else if (ev.type === "score"){
    this.setState({
      score: this.state.score + 1
    })
      if(this.state.score == this.state.target){
        store.dispatch({type: 'LEVEL_UP'})
        let doneLevel = store.getState().level.doneLevel
        AsyncStorage.setItem('CURRENT_LEVEL2', (doneLevel).toString())
      }
  }
    else if (ev.type === "pause"){ 
      // console.log(store.getState().pausing)   
      this.setState({
        running: false,
      });
    }  
  };
  gameOverHandle = () =>{
    this.setState({
      running: false,
      gameOver: true
    })
  }

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
    if(this.state.score == this.state.target){
      store.dispatch({type: 'LEVEL_UP'})
      let doneLevel = store.getState().level.doneLevel
      AsyncStorage.setItem('CURRENT_LEVEL2', (doneLevel).toString())
    }
  }
  reset = () => {
    console.log('test rết function')
    store.dispatch({type: 'ENABLE_ANSWER'})
    store.dispatch({type: 'RESET_INDEX'});
    // store.dispatch({type: 'UNFLAGGED_WIN'})
    this.GameEngine.swap(this.setupWorld());
    this.setState({
        running: true,
        score: 0,
        gameOver: false,
    });
  };

  next = () => {
    console.log('test nex functon')
    store.dispatch({type: 'ENABLE_ANSWER'})
    // store.dispatch({type: 'RESET_INDEX'});
    // store.dispatch({type: 'LEVEL_UP'})
    // console.log("test level next: " + store.getState().level.currentLevel)
    // store.dispatch({type: 'UNFLAGGED_WIN'})
    var data = store.getState().quizData.listQuiz
    console.log(data)
    var current_level = store.getState().level.currentLevel
    var quizLevel = data.filter((x)=>x.level == current_level);
    console.log(quizLevel)
    this.GameEngine.swap(this.setupWorld());
    this.setState({
        running: true,
        score: 0,
        gameOver: false,
        target: quizLevel.length + current_level*5 + 40,
        listQuiz: quizLevel
    });
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
      {
        this.state.gameOver == false && this.state.running == false ?   
        <Quiz plusScore = {this.plusScore} updateRuningStatus = {this.updateRuningStatus} gameOverHandle = {this.gameOverHandle} listQuiz = {this.state.listQuiz} />
        :
        null
      }
      {
        this.state.gameOver == true ?
        <TouchableOpacity style={styles.fullScreenButton}>
            <View style={styles.fullScreen}>
              <View style = {styles.contentComponent}>
                <View style = {{alignItems: 'center'}}> 
                  <Text style={styles.gameOverText}>Game Over</Text>
                  <Text style = {styles.contentText} > {'Score:    ' + this.state.score} </Text>
                  <Text style = {styles.contentText} > {'Level:    ' + store.getState().level.currentLevel} </Text>
            
                </View>
              
              <View style = { styles.functionButton}>
                <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('PunchMouseLevel')}>    
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
          null
      }
      {
        this.state.target == this.state.score ?
          <TouchableOpacity style={styles.fullScreenButton}>
            <View style={styles.fullScreen}>
              <View style = {styles.contentComponent}>
                <View style = {{alignItems: 'center'}}> 
                  <Text style={styles.gameOverText}> { store.getState().level.currentLevel < store.getState().quizData.totalLevel ? 'Level Up' : 'Completed!' }</Text>
                  <Text style = {styles.contentText} > {'Score:    ' + this.state.score} </Text>
                  <Text style = {styles.contentText} > {'Level:    ' + store.getState().level.currentLevel} </Text>
            
                </View>
              
              <View style = { styles.functionButton}>
                <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('PunchMouseLevel')}>    
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
          null
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
    // marginTop: 15
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
    height: Constants.MAX_HEIGHT/5*2,
    backgroundColor: '#c2995b',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 5,
    justifyContent: 'center'

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
    marginStart: 20,
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