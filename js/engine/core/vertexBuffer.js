'use strict';
import * as glSystem from './gl.js';

let vertexBuffer = null;
let textureCoordinateBuffer = null;

let verticesOfSquare = [
    0.5, 0.5, 0,
    -0.5, 0.5, 0,
    0.5, -0.5, 0,
    -0.5, -0.5, 0
];

let coordinatesOfTexture = [
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
]

function get(){
    return vertexBuffer;
}

function getTextureCoordinatesBuffer(){
    return textureCoordinateBuffer;
}

function init(){
    let gl = glSystem.get();
    // Create an empty buffer.
    vertexBuffer = gl.createBuffer();
    // Activate this buffer. Make sure its the active one.
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // load the data into the active buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);

    // Init the texture coordinate buffer and bind accordingly.
    textureCoordinateBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordinatesOfTexture), gl.STATIC_DRAW);
}

function cleanUp(){
    if(vertexBuffer !== null){
        glSystem.get().deleteBuffer(vertexBuffer);
        vertexBuffer = null;
    }

    if(textureCoordinateBuffer !== null){
        glSystem.get().deleteBuffer(textureCoordinateBuffer);
        textureCoordinateBuffer = null;
    }
}

export {init, get, getTextureCoordinatesBuffer, cleanUp}