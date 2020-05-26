import Matter from "matter-js";
import Constants from "../Constants";
// import store from '../redux/store';
import { Alert } from "react-native";
import Sound from 'react-native-sound'
let tick = 1;
let pose = 1;
let timeOut = false;
let check = true;

// let mouse = Matter.Bodies.rectangle( Constants.MAX_WIDTH/2, 
//     Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2,
//     Constants.BIRD_SIZE, 
//     Constants.BIRD_SIZE, 
//     { isStatic: false,}                                        
//     );
    
const Physics = (entities, { touches, time, dispatch }) => {

    let engine = entities.physics.engine;
    // let mouse = entities.mouse.body;
    let cake = entities.cake.body; 
    let world = engine.world;
    tick += 1;
    Object.keys(entities).forEach(key => {
       
        if (key.indexOf("mouse") === 0 ) {
            // console.log(entities[key].isBroke)
            if (tick%15 == 0 ){
                entities[key].pose = entities[key].pose + 1
                if ( entities[key].pose == 4){
                    entities[key].pose = 1
                }
            }
            if (entities[key].body.position.y > Constants.MAX_HEIGHT - 30){

            }
            // console.log("key " +key)
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
                
        }
    })
    
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default Physics;