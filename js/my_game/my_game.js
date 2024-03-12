import engine from '../engine/index.js';
import SceneFileParser from './util/scene_parser.js';
import BlueLevel from './blue_level.js';
let KeyInfo = engine.input;

class MyGame extends engine.GameScene {

    constructor(){
        super();
        this.mCamera = null;
        this.squareSet = [];
        this.mSceneFile = './assets/scene.xml';
        this.mBackgroundAudio = 'assets/sounds/bg_music.wav';
        this.mCueMusic = 'assets/sounds/cue_music.mp3';
    }

    load(){
        engine.xmlResource.load(this.mSceneFile);
        engine.audio.load(this.mBackgroundAudio);
        engine.audio.load(this.mCueMusic);
    }

    unload(){
        engine.xmlResource.unload(this.mSceneFile);
        engine.audio.unload(this.mBackgroundAudio);
        engine.audio.unload(this.mCueMusic);
    }

    init(){
        let sceneParser = new SceneFileParser(engine.xmlResource.get(this.mSceneFile));
        this.mCamera = sceneParser.parseCamera();
        sceneParser.parseSquares(this.squareSet);
        engine.audio.playBackground(this.mBackgroundAudio, 1.0);
    }

    update(){
        let transform = this.squareSet[0].getTransform();
        let deltax = 0.05;
        transform.incXPosBy(deltax);    
        if(KeyInfo.isKeyPressed(KeyInfo.keys.N)){
            this.next();
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.Up)){
            engine.audio.incBackgroundVolume(0.5);
        }
        if(KeyInfo.isKeyPressed(KeyInfo.keys.Down)){
            engine.audio.incBackgroundVolume(-0.5);
        }
        if(KeyInfo.isKeyClicked(KeyInfo.keys.I)){
            engine.audio.playCue(this.mCueMusic, 1);
        }
     }
    
    next(){
        super.next();
        let nextLevel = new BlueLevel();
        nextLevel.start();
    }

    draw(){
        engine.clearCanvas(this.mClearColor);
        this.mCamera.setViewPortAndCameraMatrix();
        let i;
        for (i = 0; i < this.squareSet.length; i++){
            this.squareSet[i].draw(this.mCamera);
        }
    }
}


let startButton = document.getElementById('startButton');
startButton.onclick = function(e){
    engine.audio.enableAudioSupport();
    engine.init('GLCanvas');
    let game = new MyGame();
    game.start();
}
