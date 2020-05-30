import Matter from "matter-js";
import Constants from "./Constants";
import store from '../../redux/store';
import { Alert } from "react-native";
import Sound from 'react-native-sound'
let tick = 1;
let pose = 1;
let timeOut = false;
let check = true;

    
const Physics = (entities, { touches, time, dispatch }) => {

    let engine = entities.physics.engine;
    let cake = entities.cake.body; 
    let world = engine.world;
    tick += 1;
    let points = touches.filter(t => t.type === "press").map(t => {
        return {x: t.event.pageX, y: t.event.pageY};
    });
    Object.keys(entities).forEach(key => {
        if (key.indexOf("mouse") === 0 || key.indexOf("porcupine") === 0) {
            // console.log(entities[key].isBroke)
            //create animate by change image for mouse
            if (entities[key].body.position.x != 10*Constants.MAX_WIDTH){
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
                let bounds = entities[key].body.bounds;
                points.forEach(p => {
                    // console.log(store.getState().pausing)
                    if (Matter.Bounds.contains(bounds, p)){
                        console.log("touch1111 " + key )
                        // delete(entities[key].body)
                        if (key.indexOf("mouse") === 0){
                            Matter.Body.setPosition( entities[key].body, { x: 10*Constants.MAX_WIDTH, 
                                                                           y: 10*Constants.MAX_HEIGHT})
                            dispatch({ type: "score"}); 
                        }
                        else {
                            dispatch({ type: "pause"}); 
                            
                        }
                        
                        // Matter.World.remove(world, entities[key].body, true)
                        // Matter.Composite.remove(world, entities[key])
                    }
                })
                if (tick%5 == 0 && key.indexOf("mouse") === 0){
                    entities[key].pose = entities[key].pose + 1
                    if ( entities[key].pose == 5){
                        entities[key].pose = 1
                    }
                }
            }
            
            // if (entities[key].body.position.y > Constants.MAX_HEIGHT/3){
            //     console.log("<10")
            // }
            // console.log("key " +key)
            //Random translate(x,y) for mouse and porcupine
                
        }
    })
    
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default Physics;