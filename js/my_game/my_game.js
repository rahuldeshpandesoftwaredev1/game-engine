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
    }

    load(){
        engine.xmlResource.load(this.mSceneFile);
    }

    unload(){
        console.log('unloading the xml file');
        engine.xmlResource.unload(this.mSceneFile);
    }

    init(){
        let sceneParser = new SceneFileParser(engine.xmlResource.get(this.mSceneFile));
        this.mCamera = sceneParser.parseCamera();
        sceneParser.parseSquares(this.squareSet);
    }

    update(){
        let transform = this.squareSet[0].getTransform();
        let deltax = 0.05;
        transform.incXPosBy(deltax);    
        if(KeyInfo.isKeyPressed(KeyInfo.keys.F)){
            console.log('start next scene');
            this.next();
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

window.onload = function(){
    engine.init('GLCanvas');
    let game = new MyGame();
    game.start();
}