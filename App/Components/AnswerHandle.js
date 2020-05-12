import Matter, { World, Sleeping } from "matter-js";
import Constants from "./Constants";
import store from '../redux/store';
import Sound from 'react-native-sound'
import { Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

let checkFall = false;
let isUpdated = false;
const correctSound = new Sound(require('../Assets/sounds/correctSound.mp3'),
      (error, sound) => {
      if (error) {
        console.log("Can not load correct sound");
        return;
      }})

const failedSound = new Sound(require('../Assets/sounds/failedSound.mp3'),
(error, sound) => {
if (error) {
  console.log("Can not load failed sound");
  return;
}})
function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }

const AnswerHandle = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine;
    let mainCharacter = entities.mainCharacter.body;
    let bird = entities.bird.body; 
    let _isCorrect = store.getState().isCorrect;
    let world = engine.world;
    let soundStatus = store.getState().soundStatus;

    _isCorrect = store.getState().isCorrect;

    if (_isCorrect == true) {
      if (bird.position.x > mainCharacter.position.x && checkFall == false ){
        Matter.Body.translate( bird, {x: -10, y: 0});
        
      }
      else if (mainCharacter.position.y > Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2 && checkFall == false){
        Matter.Body.translate( mainCharacter, {x: 0, y: -10});
      }  
      else{
        Matter.Body.setPosition( bird, { x:Constants.MAX_WIDTH + 2*Constants.BIRD_SIZE, 
                                         y: Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2})
        if( isUpdated == false ){
          checkFall = true;
          dispatch({ type: "score"});        
          if ( soundStatus == true ){
            correctSound.play();
          }
          isUpdated = true;
        }       
        if (mainCharacter.position.y <= Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.MAIN_CHARACTER_SIZE/2 - 9){
          Matter.Body.translate( mainCharacter, {x: 0, y: +10});
        }
        else {
          Matter.Body.setPosition( mainCharacter, { x: Constants.FLOOR_HEIGHT + Constants.MAIN_CHARACTER_SIZE/2, 
                                                    y: Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.MAIN_CHARACTER_SIZE/2})
         
          if (store.getState().winFlag == true){
            store.dispatch({type: 'ENABLE_ANSWER'})
            store.dispatch({type: 'RESET'});
            checkFall = false;
            isUpdated = false;
            // store.dispatch({ type: 'UPDATE_LEVEL'})
            let currentLevel = store.getState().level.currentLevel
            let doneLevel = store.getState().level.doneLevel
            console.log( currentLevel + "   " + doneLevel)
            if (currentLevel <= doneLevel && doneLevel < store.getState().quizData.totalLevel){
              AsyncStorage.setItem('CURRENT_LEVEL', ((doneLevel + 1)).toString())
              // console.log('Asyn' + AsyncStorage.getItem('CURRENT_LEVEL'))
              store.dispatch({ type: 'LEVEL_UP'})
              console.log("levelup test in answerHandle " + store.getState().level.doneLevel)
            }
              
            dispatch({ type: "game-over"}); 
          }
          else{
            store.dispatch({ type: 'UPDATE_INDEX'})
            // AsyncStorage.setItem('CURRENT_QUIZ', (store.getState().updateIndex).toString())
            store.dispatch({type: 'ENABLE_ANSWER'})
            store.dispatch({type: 'RESET'});
            checkFall = false;
            isUpdated = false;
          }
        }
      }
    }

    else if (_isCorrect == false){
        if (bird.position.x > (mainCharacter.position.x  + 3)){
          Matter.Body.translate( bird, {x: -6, y: 0});
        }
        else if (bird.position.y < Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.BIRD_SIZE/2 - 9){
          Matter.Body.translate( bird, {x: 0, y: +10}); 
        }
        else {
          Matter.Body.setPosition(bird, {x: Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2,
                                         y: Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.BIRD_SIZE/2});
          if ( soundStatus == true ){
            failedSound.play();
          }      
          delete(entities.mainCharacter)
          dispatch({ type: "game-over"}); 
          store.dispatch({type: 'RESET'});        
        } 
    }
    // if ( checkSwap == true && mainCharacter.position.y >= Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.MAIN_CHARACTER_SIZE/2){
    //   checkSwap = false;
    //   Matter.Body.setStatic(mainCharacter, true);
    //   store.dispatch( { type: 'UPDATE_INDEX'});
    // }   
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default AnswerHandle;