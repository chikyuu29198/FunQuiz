import Matter from "matter-js";
import Constants from "./Constants";
import store from '../../redux/store';
import { Alert } from "react-native";
import Sound from 'react-native-sound'
let tick = 1;
let pose = 1;
let timeOut = false;
let check = true;
let porcupineTouch = null;
let poseOfCake = 1;

const mouseSound = new Sound(require('../../Assets/sounds/punchedMouse.mp3'),
      (error, sound) => {
      if (error) {
        console.log("Can not load correct sound");
        return;
      }}) 
const eatCakeSound = new Sound(require('../../Assets/sounds/eatCake.mp3'),
(error, sound) => {
if (error) {
console.log("Can not load correct sound");
return;
}}) 
const Physics = (entities, { touches, time, dispatch }) => {

    let engine = entities.physics.engine;
    let cake = entities.cake.body; 
    let world = engine.world;
    tick += 1;
    let soundStatus = store.getState().soundStatus;
    if (porcupineTouch!=null){
        if(entities[porcupineTouch].pose == 1){
            Matter.Body.setPosition( entities[porcupineTouch].body, { x: 10*Constants.MAX_WIDTH, 
                y: 10*Constants.MAX_HEIGHT})
            porcupineTouch = null
        }
        else if(entities[porcupineTouch].pose == 0)
            entities[porcupineTouch].pose = 1
    }
    let points = touches.filter(t => t.type === "press").map(t => {
        return {x: t.event.pageX, y: t.event.pageY};
    });
    Object.keys(entities).forEach(key => {
        if (key.indexOf("mouse") === 0 || key.indexOf("porcupine") === 0) {
            if(entities[key].pose == 6){
                 Matter.Body.setPosition( entities[key].body, { x: 10*Constants.MAX_WIDTH, 
                                                                 y: 10*Constants.MAX_HEIGHT})
            }
            if (entities[key].body.position.x != 10*Constants.MAX_WIDTH && entities[key].body.position.y < Constants.MAX_HEIGHT - Constants.CAKE_SIZE - entities[key].size){
                let _x = Math.floor(Math.random() * (5 - 2 + 1) ) + 2
                let direction = Math.floor(Math.random() * (2 - 1 + 1) ) + 1
                if (direction == 1){           
                    Matter.Body.rotate(entities[key].body, Math.PI)
                    Matter.Body.translate( entities[key].body, {x: +_x, y: + entities[key].speed});  
                }
                    
                else{
                    Matter.Body.rotate(entities[key].body, -Math.PI/6)
                    Matter.Body.translate( entities[key].body, {x: -_x, y: + entities[key].speed});  
                }
                if(entities[key].body.position.y > Constants.MAX_HEIGHT/5*3){
                    if (entities[key].body.position.x > Constants.MAX_WIDTH/2){
                        Matter.Body.translate( entities[key].body, {x: - 10, y: + entities[key].speed});  
                    }
                    else {
                        Matter.Body.translate( entities[key].body, {x: + 10, y: + entities[key].speed});
                    }
                }
                let bounds = entities[key].body.bounds;
                points.forEach(p => {
                    // console.log(store.getState().pausing)
                    if (Matter.Bounds.contains(bounds, p)){
                        console.log("touch1111 " + key )
                        // delete(entities[key].body)
                        if (key.indexOf("mouse") === 0){
                            entities[key].pose = 6
                            console.log( entities[key].pose)
                            if ( soundStatus == true ){
                                mouseSound.play();
                              }
                           
                            dispatch({ type: "score"}); 
                        }
                        else {
                            porcupineTouch = key
                            if ( soundStatus == true ){
                                mouseSound.play();
                              }
                            dispatch({ type: "pause"}); 
                            
                        }
                    }
                })
                if (tick%5 == 0 && key.indexOf("mouse") === 0){
                    if( entities[key].pose != 6){
                        entities[key].pose = entities[key].pose + 1
                    if ( entities[key].pose == 5){
                        entities[key].pose = 1
                    }}
                }
            }
            else if (entities[key].body.position.x != 10*Constants.MAX_WIDTH && entities[key].body.position.y >= Constants.MAX_HEIGHT - Constants.CAKE_SIZE -entities[key].size){
                if( entities[key].body.position.x >= Constants.MAX_WIDTH/2 - Constants.CAKE_SIZE - entities[key].size &&  entities[key].body.position.x <= Constants.MAX_WIDTH/2 + Constants.CAKE_SIZE + entities[key].size){
                Matter.Body.setPosition(entities[key].body, {x: Constants.MAX_WIDTH/2 - entities[key].size/2,
                                                             y: Constants.MAX_HEIGHT - Constants.CAKE_SIZE - entities[key].size});
                poseOfCake++;
            }
                else {
                    if(entities[key].body.position.x > Constants.MAX_HEIGHT/2 - Constants.CAKE_SIZE - entities[key].size){
                        Matter.Body.translate( entities[key].body, {x: - 10, y: 0});
                    }
                    else {
                        Matter.Body.translate( entities[key].body, {x: + 10, y: 0});
                    }
                }
                if (poseOfCake == 4){
                    if ( soundStatus == true ){
                        eatCakeSound.play();
                      }
                    entities.cake.pose = entities.cake.pose + 1
                    poseOfCake = 1
                    if(entities.cake.pose == 4){
                        dispatch({type: "game-over"})
                    }
                }
                let bounds = entities[key].body.bounds;
                points.forEach(p => {
                    if (Matter.Bounds.contains(bounds, p)){
                        if (key.indexOf("mouse") === 0){
                            console.log("touch1111 " + key )
                            // delete(entities[key].body)
                            if (key.indexOf("mouse") === 0){
                                entities[key].pose = 6
                                console.log( entities[key].pose)
                                if ( soundStatus == true ){
                                    mouseSound.play();
                                  }
                               
                                dispatch({ type: "score"}); 
                            }
                        else {
                            porcupineTouch = key
                            if ( soundStatus == true ){
                                mouseSound.play();
                              }
                            dispatch({ type: "pause"});
                        }
                        
                    }}
                })
            }
        }
    })
    
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default Physics;