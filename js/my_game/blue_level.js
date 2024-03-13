import engine from '../engine/index.js';
import Renderable from '../engine/renderables/Renderable.js'
import TextureRenderable from '../engine/renderables/TextureRenderable.js';
let KeyInfo = engine.input;

class BlueLevel extends engine.GameScene {
    constructor(){
        super();
        this.blueSquare = null;
        this.pawnSoldier = null;
        this.mCueMusic = 'assets/sounds/cue_music.mp3';
        this.mTexturePath = 'assets/images/pawn.png';
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

        // Init happens after load
        this.pawnSoldier = new TextureRenderable(this.mTexturePath);
        this.pawnSoldier.getTransform().setXPos(24);
        this.pawnSoldier.getTransform().setYPos(60);
        this.pawnSoldier.getTransform().setWidth(2);
        this.pawnSoldier.getTransform().setHeight(2);
    }

    load(){
        engine.textureResource.load(this.mTexturePath);
        engine.audio.load(this.mCueMusic);
    }

    unload(){
        engine.audio.unload(this.mCueMusic);
        engine.textureResource.unload(this.mTexturePath);
    }

    update(){
        let delta = 0.05;
        if(KeyInfo.isKeyPressed(KeyInfo.keys.D)){
            this.blueSquare.getTransform().incXPosBy(delta);    
        }
        if(KeyInfo.isKeyClicked(KeyInfo.keys.D)){
            engine.audio.playCue(this.mCueMusic, 1);
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
      //  this.blueSquare.draw(this.mCamera);
        this.pawnSoldier.draw(this.mCamera);
    }
}

export default BlueLevel;