import Matter from "matter-js";
import Constants from "../Constants";
// import store from '../redux/store';
import { Alert } from "react-native";
import Sound from 'react-native-sound'
let tick = 1;
let pose = 1;
let timeOut = false;
let check = true;

let mouse = Matter.Bodies.rectangle( Constants.MAX_WIDTH/2, 
    Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2,
    Constants.BIRD_SIZE, 
    Constants.BIRD_SIZE, 
    { isStatic: false,}                                        
    );
    
const Physics = (entities, { touches, time, dispatch }) => {

    let engine = entities.physics.engine;
    let mouse = entities.mouse.body;
    let cake = entities.cake.body; 
    let world = engine.world;
    tick += 1;
    if (tick%15 == 0 && mouse){
        if (pose>=3){
            check = false
        }
        if (pose <= 1){
            check = true
        }
        if (check == true)
            pose ++;
        else if(check == false){
            pose --;
        }
        entities.mouse.pose = pose;
    }
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default Physics;