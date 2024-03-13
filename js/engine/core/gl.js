'use strict';

let mGL = null;
let mCanvas = null;

function get(){
    return mGL;
}

function init(canvasID){
    mCanvas = document.getElementById(canvasID);
    
    if(mCanvas == null)
    {
        throw new Error('Canvas of id  = ' + canvasID + ' does nto exist.');
    }
    
    // Ensure the canvas is opaque. That way its faster to draw transparent content on the canvas.
    mGL = mCanvas.getContext('webgl2', {alpha: false}) || canvas.getContext('experimental-webgl2', {alpha: false});
    
    if(mGL == null)
    {
        document.write('WebGL is not supported on your browser.');
        return;
    } 
    
    // Enable transparency for textures.
    mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
    mGL.enable(mGL.BLEND);

    // Define texture coordinate space with lower left as origin.
    mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);
}

function cleanUp(){
    if((mGL == null) || (mCanvas == null)){
        throw new Error('Engine cleanup error: engine was never initialized..');
    }
    mGL = null;
    mCanvas.style.position = 'fixed';
    mCanvas.style.backgroundColor = 'rgba(200, 200, 200, 0.5)';
    mCanvas = null;
    document.body.innerHTML += '<br>End of game..'
}

export {init, get, cleanUp}