import Matter from "matter-js";
import Constants from "./Constants";

let tick = 1;
let pose = 1;

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let mainCharacter = entities.mainCharacter.body;
    let bird = entities.bird.body;

    touches.filter(t => t.type === "press").forEach(t => {
        Matter.Body.applyForce( mainCharacter, mainCharacter.position, {x: 0.00, y: -0.020});
    });
    if (bird.position.x <= (mainCharacter.position.x + Constants.BIRD_SIZE/2 + Constants.MAIN_CHARACTER_SIZE/2)) {
        Matter.Body.translate(bird, {x: 0, y: +10})
    }
    else {
        Matter.Body.translate(bird, {x: -1, y: 0})
    }

    Object.keys(entities).forEach(key => {
        if (key.indexOf("floor") === 0) {
            if (entities[key].body.position.x <= -1*Constants.MAX_WIDTH){
                Matter.Body.setPosition( entities[key].body, { x: Constants.MAX_WIDTH, y: Constants.MAX_HEIGHT})
            }
            Matter.Body.translate( entities[key].body, {x: -2, y: 0});  
        }
    })
    // Matter.Body.applyForce( bird, bird.position, {x: 0.1, y: 0});
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