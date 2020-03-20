import Matter, { World, Sleeping } from "matter-js";
import Constants from "./Constants";
import store from '../redux/store';
import { Alert } from "react-native";

function sleep(milliseconds) {
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
    }

const AnswerHandle = (entities, { touches, time }) => {

    let engine = entities.physics.engine;
    let mainCharacter = entities.mainCharacter.body;
    let bird = entities.bird.body; 
    let _isCorrect = store.getState().isCorrect;
    let world = engine.world;
    _isCorrect = store.getState().isCorrect;

//     function sleep(ms) {
//       return new Promise(resolve => setTimeout(resolve, ms));
//     }
    
    if (_isCorrect == true) {
        store.dispatch({type: 'RESET'});
        while (mainCharacter.position.y >= Constants.FLOOR_HEIGHT + Constants.BIRD_SIZE/2){
            
            Matter.Body.translate( mainCharacter, {x: 0, y: -1}); 
            // sleep(10);  
      }
        while (bird.position.x > (mainCharacter.position.x  + 3)){
              Matter.Body.translate( bird, {x: -1, y: 0});
            //   sleep(10);     
        }
        
      //   Matter.Composite.remove(world, bird)
        Matter.World.remove(world, bird)
        engine.world.gravity.y = 0.5;
        
    }
    else if (_isCorrect == false){
        store.dispatch({type: 'RESET'}); 
        while (bird.position.x > (mainCharacter.position.x + Constants.BIRD_SIZE/2 + Constants.MAIN_CHARACTER_SIZE/2)){
              Matter.Body.translate( bird, {x: -1, y: 0});      
        }
        while (bird.position.y < Constants.MAX_HEIGHT - Constants.FLOOR_HEIGHT - Constants.BIRD_SIZE/2){
              Matter.Body.translate( bird, {x: 0, y: +1});    
        }      
    }
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default AnswerHandle;