import Matter from "matter-js";
import Constants from "./Constants";
import store from '../redux/store';
import { Alert } from "react-native";
import Sound from 'react-native-sound'
let tick = 1;
let pose = 1;
let timeOut = false;

const failedSound = new Sound(require('../Assets/sounds/failedSound.mp3'),
(error, sound) => {
if (error) {
  console.log("Can not load failed sound")
  return;
}})

const Physics = (entities, { touches, time, dispatch }) => {

    let engine = entities.physics.engine;
    let mainCharacter = entities.mainCharacter.body;
    let bird = entities.bird.body; 
    let _isCorrect = store.getState().isCorrect;
    let world = engine.world;
    let soundStatus = store.getState().soundStatus;
    _isCorrect = store.getState().isCorrect;

    // console.log(entities.floor.position.y)
    // console.log(Constants.MAX_HEIGHT/2)

    if ( _isCorrect == null && timeOut == false && bird.position.y == Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2){
        if (bird.position.x <= mainCharacter.position.x ) {
            timeOut = true;
        }
        else {
            Matter.Body.translate(bird, {x: -3, y: 0})            
        }
    }
    if (timeOut == true && _isCorrect == null){

        if (bird.position.y < Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.BIRD_SIZE/2 -9){
            Matter.Body.translate(bird, {x: 0, y: +10})
        }
        else{
            Matter.Body.setPosition(bird, {x: Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2,
                                           y: Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.BIRD_SIZE/2});
            // console.log(soundStatus)
            if ( soundStatus == true ){
                failedSound.play();
            }
            dispatch({ type: "game-over"}); 
            timeOut = false;
        }
    }
    Object.keys(entities).forEach(key => {
        if (key.indexOf("floor") === 0) {
            if (entities[key].body.position.x <= -0.5*Constants.MAX_WIDTH){
                Matter.Body.setPosition( entities[key].body, { x:1.5*Constants.MAX_WIDTH, y: Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT/2})
            }
            Matter.Body.translate( entities[key].body, {x: -2, y: 0});  
        }
    })
    tick += 1;
    if (tick%8 == 0 && mainCharacter){
        pose ++;
        if(pose == 9){
            pose = 1;
        }
        entities.mainCharacter.pose = pose;
    }
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default Physics;