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

export {init, get}