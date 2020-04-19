import Matter, { World, Sleeping } from "matter-js";
import Constants from "./Constants";
import store from '../redux/store';
import Sound from 'react-native-sound'
import { Alert } from "react-native";

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
      // console.log( soundStatus)
      if (bird.position.x > mainCharacter.position.x && checkFall == false ){
        Matter.Body.translate( bird, {x: -10, y: 0});
        
      }
      else if (mainCharacter.position.y > Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2 && checkFall == false){
        console.log("nhay")
        console.log(checkFall)
        Matter.Body.translate( mainCharacter, {x: 0, y: -10});
      }  
      else{
        Matter.Body.setPosition( bird, { x:Constants.MAX_WIDTH + 2*Constants.BIRD_SIZE, 
                                         y: Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2})
        if( isUpdated == false ){
          console.log("check")
          checkFall = true;
          dispatch({ type: "score"});        
          if ( soundStatus == true ){
            correctSound.play();
          }
          isUpdated = true;
        }       
        if (mainCharacter.position.y <= Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.MAIN_CHARACTER_SIZE/2 - 9){
          console.log("sssss")
          Matter.Body.translate( mainCharacter, {x: 0, y: +10});
        }
        else {
          Matter.Body.setPosition( mainCharacter, { x: Constants.FLOOR_HEIGHT + Constants.MAIN_CHARACTER_SIZE/2, 
                                                    y: Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.MAIN_CHARACTER_SIZE/2})
          store.dispatch({ type: 'UPDATE_INDEX'})
          store.dispatch({type: 'ENABLE_ANSWER'})
          store.dispatch({type: 'RESET'});
          checkFall = false;
          isUpdated = false;
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