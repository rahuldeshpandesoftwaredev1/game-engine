'use strict';
import * as core from './gl.js';

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
    let gl = core.get();
    // Create an empty buffer.
    vertexBuffer = gl.createBuffer();
    // Activate this buffer. Make sure its the active one.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // load the data into the active buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
}

export {init, get}