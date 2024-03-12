import Renderable from '../engine/Renderable.js';
import engine from '../engine/index.js';
import * as gameLoop from '../engine/core/gameLoop.js';
import SceneFileParser from './util/scene_parser.js';

let clearColor = [0,0.8, 0.3, 1];

class MyGame {

    constructor(){
        this.mCamera = null;
        this.squareSet = [];
        this.mSceneFile = './assets/scene.xml';
    }

    loadResources(){
        engine.xmlResource.load(this.mSceneFile);
    }

    unloadResources(){
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
     }

    draw(){
        engine.clearCanvas(clearColor);
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
    gameLoop.start(game);
}