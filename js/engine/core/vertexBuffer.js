'use strict';
import * as glSystem from './gl.js';

let vertexBuffer = null;
function get(){
    return vertexBuffer;
}

let verticesOfSquare = [
    0.5, 0.5, 0,
    -0.5, 0.5, 0,
    0.5, -0.5, 0,
    -0.5, -0.5, 0
];

function init(){
    let gl = glSystem.get();
    // Create an empty buffer.
    vertexBuffer = gl.createBuffer();
    // Activate this buffer. Make sure its the active one.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // load the data into the active buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
}

function cleanUp(){
    if(vertexBuffer !== null){
        glSystem.get().deleteBuffer(vertexBuffer);
        vertexBuffer = null;
    }
}

export {init, get, cleanUp}