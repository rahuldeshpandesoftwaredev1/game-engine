import engine from '../engine/index.js';

class MyGame {
    constructor(htmlCanvasID){
        engine.init(htmlCanvasID);
        engine.clearCanvas([0, 0.8, 0.3, 1]);
        
        this.mWhiteSquare = new engine.Renderable();
        this.mWhiteSquare.setColor([1,1,1,1]);
        this.mWhiteSquare.getTransform().setXPos(-0.5);
        this.mWhiteSquare.getTransform().setYPos(-0.4);
        this.mWhiteSquare.getTransform().setWidth(0.3);
        this.mWhiteSquare.draw();
        
        this.mRedSquare = new engine.Renderable();
        this.mRedSquare.setColor([1,0,0,1]);        
        this.mRedSquare.getTransform().setPosition(0.3, 0.7);
        this.mRedSquare.getTransform().setRotationInDegrees(0);
        this.mRedSquare.getTransform().setSize(0.5, 0.5);
        this.mRedSquare.draw();
    }
}

window.onload = function(){
    new MyGame('GLCanvas');
}