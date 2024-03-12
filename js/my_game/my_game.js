import Renderable from '../engine/Renderable.js';
import engine from '../engine/index.js';
import * as gameLoop from '../engine/core/gameLoop.js';

let clearColor = [0,0.8, 0.3, 1];

class MyGame {

    constructor(){
        this.mRedSquare = null;
        this.mBlackSquare = null;
        this.mBlueSquare = null;
        this.mCamera = null;
    }

    init(){

        this.mCamera = new engine.Camera(
            [20, 60], // center
            20,
            [20, 40, 600, 300]
        );

        this.mBlueSquare = new Renderable();
        this.mBlueSquare.setColor([0, 0, 1, 1]);
        

        this.mRedSquare = new Renderable();
        this.mRedSquare.setColor([1,0,0,1]);
        this.mRedSquare.getTransform().setPosition(20, 60);

        this.mBlackSquare = new Renderable();
        this.mBlackSquare.setColor([0,0,0,1]);
        this.mBlackSquare.getTransform().setPosition(15, 60);
    }

    draw(){
        engine.clearCanvas(clearColor);
        this.mCamera.setViewPortAndCameraMatrix();
        this.mBlackSquare.draw(this.mCamera);
        this.mRedSquare.draw(this.mCamera);
        this.mBlueSquare.draw(this.mCamera);
    }

    update(){
        let transform = this.mRedSquare.getTransform();
        let delta = 0.05;
        let KeyClass = engine.input;
        if (KeyClass.isKeyPressed(KeyClass.keys.W)){
            transform.incYPosBy(delta);    
        }
        if (KeyClass.isKeyPressed(KeyClass.keys.S)){
            transform.incYPosBy(-delta);    
        }
        if (KeyClass.isKeyPressed(KeyClass.keys.A)){
            transform.incXPosBy(-delta);    
        }
        if (KeyClass.isKeyPressed(KeyClass.keys.D)){
            transform.incXPosBy(delta);    
        }

        if(transform.getXPos() > 30)
        {
            transform.setPosition(10, transform.getYPos());
        }

        if(transform.getXPos() < 10)
        {
            transform.setPosition(30, transform.getYPos());
        }

        if(transform.getYPos() > 75)
        {
            transform.setPosition(transform.getXPos(), 55);
        }

        if(transform.getYPos() < 55)
        {
            transform.setPosition(transform.getXPos(), 65);
        }

        if(KeyClass.isKeyPressed(KeyClass.keys.L)){
            transform.incSizeBy(delta);
        }

        if(engine.input.isKeyPressed(engine.input.keys.D)){
            console.log('D is pressed.');
            if(transform.getXPos() > 30)
            {
                transform.setPosition(10, 60);
            }
        }
//        transform.incRotationByDegrees(-1);

        if(engine.input.isKeyClicked(engine.input.keys.J)){
            transform.incRotationByDegrees(20);
        }

        if(engine.input.isKeyPressed(engine.input.keys.G)){
            console.log('G is pressed.');
            let blackTransform = this.mBlackSquare.getTransform();
            if(blackTransform.getWidth() > 5){
                blackTransform.setSize(2, 2);
            }
            blackTransform.incSizeBy(0.05);                
        }
    }
}

window.onload = function(){
    engine.init('GLCanvas');
    let game = new MyGame();
    gameLoop.start(game);
}