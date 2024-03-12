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
    
    mGL = mCanvas.getContext('webgl2') || canvas.getContext('experimental-webgl2');
    
    if(mGL == null)
    {
        document.write('WebGL is not supported on your browser.');
        return;
    }   
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