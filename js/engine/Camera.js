import * as glSystem from './core/gl.js';

class Camera {
    constructor(worldCenter, worldWidth, viewPortDimensions){
        this.mWorldCenter = worldCenter;
        this.mWorldWidth = worldWidth;
        this.mViewPort = viewPortDimensions;

        this.mCameraMatrix = mat4.create();

        this.mBackgroundColor = [0.8, 0.8, 0.8, 1];
    }

    getWorldWidth(){
        return this.mWorldWidth;
    }

    setWorldWidth(width){
        this.mWorldWidth = width;
    }

    setViewPort(viewPortData){
        this.mViewPort = viewPortData;
    }

    getViewPortData(){
        return this.mViewPort;
    }

    setBackgroundColor(color){
        this.mBackgroundColor = color;
    }

    getBackgroundColor(){
        return this.mBackgroundColor;
    }

    getWorldHeight(){
        let ratio = this.mViewPort[eViewport.eHeight]/
                    this.mViewPort[eViewport.eWidth];
        return ratio * this.getWorldWidth();
    }

    getWorldCenter(){
        return this.mWorldCenter;
    }

    setWorldCenter(xPosition, yPosition){
        this.mWorldCenter[0] = xPosition;
        this.mWorldCenter[1] = yPosition;
    }

    setViewPortAndCameraMatrix(){
        let gl = glSystem.get();
        gl.viewport(this.mViewPort[0],
            this.mViewPort[1],
            this.mViewPort[2],
            this.mViewPort[3]);
        gl.scissor(this.mViewPort[0],
            this.mViewPort[1],
            this.mViewPort[2],
            this.mViewPort[3]);
        gl.clearColor(this.mBackgroundColor[0], this.mBackgroundColor[1],
                    this.mBackgroundColor[2], this.mBackgroundColor[3]);
        gl.enable(gl.SCISSOR_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.disable(gl.SCISSOR_TEST);       
        
        let center = this.getWorldCenter();
        mat4.scale(this.mCameraMatrix, mat4.create(),
                    vec3.fromValues(2.0/this.getWorldWidth(),2.0/this.getWorldHeight(), 1.0));
        mat4.translate(this.mCameraMatrix, this.mCameraMatrix, vec3.fromValues(-center[0], -center[1], 0));
    }

    getCameraMatrix(){
        return this.mCameraMatrix;
    }

}

const eViewport = Object.freeze({
    eOriginX: 0,
    eOriginY: 1,
    eWidth: 2,
    eHeight: 3
});

export default Camera;