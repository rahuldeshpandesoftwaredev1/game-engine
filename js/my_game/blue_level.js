import engine from '../engine/index.js';
import FontRenderable from '../engine/renderables/FontRenderable.js';
import Renderable from '../engine/renderables/Renderable.js'
import SpriteAnimateRenderable, { eAnimationType } from '../engine/renderables/SpriteAnimateRenderable.js';
import SpriteRenderable from '../engine/renderables/SpriteRenderable.js';
let KeyInfo = engine.input;

class BlueLevel extends engine.GameScene {
    constructor(){
        super();
        this.blueSquare = null;
        this.pawnSoldier = null;
        this.mCueMusic = 'assets/sounds/cue_music.mp3';
        this.mTexturePath = 'assets/sprite-sheet/goku.png';
        this.gokuSpriteSheet ='assets/sprite-sheet/goku.png';
        
        this.mText = null;
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
//        this.mOneChar = new SpriteRenderable(fontResources.imageName(this.mFontName));
        this.goku = new SpriteAnimateRenderable(this.gokuSpriteSheet);
        this.goku.setSpriteSequence(341, 4, 55, 65, 8,8);
        this.goku.setAnimationType(eAnimationType.eRight);
        this.goku.setAnimationSpeed(50);
        this.goku.getTransform().setXPos(24);
        this.goku.getTransform().setYPos(60);
        this.goku.getTransform().setSize(4, 4);

        this.mText = new FontRenderable('R');
        this.mText.getTransform().setPosition(20, 60);
        this.mText.getTransform().setSize(5, 9);
    }

    load(){
        engine.textureResource.load(this.mTexturePath);
        engine.textureResource.load(this.gokuSpriteSheet);
        engine.audio.load(this.mCueMusic);
    }

    unload(){
        engine.audio.unload(this.mCueMusic);
        engine.textureResource.unload(this.mTexturePath);
        engine.textureResource.unload(this.gokuSpriteSheet);
    }

    update(){
        this.goku.updateAnimation();
        let delta = 0.05;
        if(KeyInfo.isKeyPressed(KeyInfo.keys.D)){
            this.goku.incAnimationSpeed(10);
        }
        if(KeyInfo.isKeyClicked(KeyInfo.keys.D)){
            this.mText.getTransform().incXPosBy(delta);
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.A)){ 
            this.mText.getTransform().incXPosBy(-delta);
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.W)){
            this.mText.getTransform().incYPosBy(delta);
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.S)){
            this.mText.getTransform().incYPosBy(-delta);
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.Q)){
            this.stop();
        }
    }
    draw(){
        engine.clearCanvas(this.mClearColor);
        this.mCamera.setViewPortAndCameraMatrix();
        //this.goku.draw(this.mCamera);
        this.mText.draw(this.mCamera);
    }
}

export default BlueLevel;