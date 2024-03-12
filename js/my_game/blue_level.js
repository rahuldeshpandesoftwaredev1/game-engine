import engine from '../engine/index.js';
import Renderable from '../engine/Renderable.js';
let KeyInfo = engine.input;

class BlueLevel extends engine.GameScene {
    constructor(){
        super();
        this.blueSquare = null;
    }
    
    init(){
        this.mCamera = new engine.Camera(
            vec2.fromValues(20, 60),
            20,
            [20, 40, 600, 300]
        );
        this.blueSquare = new Renderable();
        this.blueSquare.getTransform().setXPos(20);
        this.blueSquare.getTransform().setYPos(60);
        this.blueSquare.getTransform().setWidth(3);
        this.blueSquare.getTransform().setHeight(2);
    }

    update(){
        let delta = 0.05;
        if(KeyInfo.isKeyPressed(KeyInfo.keys.D)){
            this.blueSquare.getTransform().incXPosBy(delta);            
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.A)){ 
            this.blueSquare.getTransform().incXPosBy(-delta);
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.W)){
            this.blueSquare.getTransform().incYPosBy(delta);
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.S)){
            this.blueSquare.getTransform().incYPosBy(-delta);
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.Q)){
            this.stop();
        }
    }
    draw(){
        engine.clearCanvas(this.mClearColor);
        this.mCamera.setViewPortAndCameraMatrix();
        this.blueSquare.draw(this.mCamera);
    }
}

export default BlueLevel;