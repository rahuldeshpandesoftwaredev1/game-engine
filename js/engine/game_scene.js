import * as gameLoop from './core/gameLoop.js';
import engine from './index.js';

const kAbstractClassError = new Error('Abstract class');
const kAbstractMethodError = new Error('Abstract Method');

class GameScene {    
    constructor(){
        this.mClearColor = [0,0.8, 0.3, 1];
        if(this.constructor === GameScene){
            throw kAbstractClassError;
        }
    }

    

    init(){

    }

    load(){

    }

    unload(){

    }

    draw(){
        // Only method of the sub-class should be called.
        throw kAbstractMethodError;
    }

    update(){
        // Only method of sub-class should be called.
        throw kAbstractMethodError;
    }

    async start(){
        await gameLoop.start(this);
    }

    next(){
        gameLoop.stop();
        this.unload();
    }

    stop(){
        gameLoop.stop();
        this.unload();
        engine.cleanUp();
    }
}

export default GameScene; 