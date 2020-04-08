import Matter from "matter-js";
import Constants from "./Constants";
import store from '../redux/store';
import { Alert } from "react-native";

let tick = 1;
let pose = 1;
let checkStatic = false;

const Physics = (entities, { touches, time, dispatch }) => {

    let engine = entities.physics.engine;
    let mainCharacter = entities.mainCharacter.body;
    let bird = entities.bird.body; 
    let _isCorrect = store.getState().isCorrect;
    let world = engine.world;

    _isCorrect = store.getState().isCorrect;
    
    // touches.filter(t => t.type === "press").forEach(t => {
    //     Matter.Body.applyForce( mainCharacter, mainCharacter.position, {x: 0.00, y: -0.020});
    // });

    if (mainCharacter.position.y > Constants.MAX_HEIGHT/2 && bird.position.y < Constants.MAX_HEIGHT/2 && _isCorrect == null){
        if (bird.position.x <= mainCharacter.position.x ) {
            checkStatic = true;
        }
        else {
            Matter.Body.translate(bird, {x: -3, y: 0})
                 
        }
    }
    if (checkStatic == true){
        Matter.Body.setStatic(bird, false);
    }
    if (bird.position.y >= Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.BIRD_SIZE/2 - Constants.MAIN_CHARACTER_SIZE){
        Matter.Body.setStatic(bird, true);
        Matter.Body.setPosition(bird, {x: Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2,
                                       y: Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.BIRD_SIZE/2})
        delete(entities.mainCharacter)
        dispatch({ type: "game-over"});
    }
    // else{
    //     jum = true;
    // }
    Object.keys(entities).forEach(key => {
        if (key.indexOf("floor") === 0) {
            if (entities[key].body.position.x <= -0.5*Constants.MAX_WIDTH){
                Matter.Body.setPosition( entities[key].body, { x:1.5*Constants.MAX_WIDTH, y: Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT/2})
            }
            Matter.Body.translate( entities[key].body, {x: -2, y: 0});  
        }
    })
    tick += 1;
    if (tick%8 == 0){
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