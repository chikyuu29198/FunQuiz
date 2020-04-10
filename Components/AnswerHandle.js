import Matter, { World, Sleeping } from "matter-js";
import Constants from "./Constants";
import store from '../redux/store';
import Sound from 'react-native-sound'
import { Alert } from "react-native";

let checkSwap = false;

const correctSound = new Sound(require('../Assets/sounds/correctSound.mp3'),
      (error, sound) => {
      if (error) {
        alert('error');
        return;
      }})

const failedSound = new Sound(require('../Assets/sounds/failedSound.mp3'),
(error, sound) => {
if (error) {
  alert('error');
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
    _isCorrect = store.getState().isCorrect;

    if (_isCorrect == true) {
      if (bird.position.x > (mainCharacter.position.x)){
        Matter.Body.translate( bird, {x: -10, y: 0});
      }
      else if (mainCharacter.position.y > Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2){
        Matter.Body.translate( mainCharacter, {x: 0, y: -10});
      }
      else {
        correctSound.play();
        store.dispatch({type: 'RESET'});
        Matter.Body.setPosition( bird, { x:Constants.MAX_WIDTH + 2*Constants.BIRD_SIZE, 
                                         y: Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2})
        checkSwap = true;
        Matter.Body.setStatic( mainCharacter, false);
        // engine.world.gravity.y = 1;
        }
    }

    else if (_isCorrect == false){
        if (bird.position.x > (mainCharacter.position.x  + 3)){
          Matter.Body.translate( bird, {x: -6, y: 0});
        }
        else if (bird.position.y < Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.BIRD_SIZE/2){
          Matter.Body.translate( bird, {x: 0, y: +6}); 
        }
        else {
          failedSound.play();
          delete(entities.mainCharacter)
          dispatch({ type: "game-over"}); 
          store.dispatch({type: 'RESET'});
          
        } 
    }
    if ( checkSwap == true && mainCharacter.position.y >= Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.MAIN_CHARACTER_SIZE/2){
      checkSwap = false;
      Matter.Body.setStatic(mainCharacter, true);
      store.dispatch( { type: 'UPDATE_INDEX'});
    }   
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default AnswerHandle;