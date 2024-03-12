import * as glSystem from './core/gl.js';
import * as vertexBuffer from './core/vertexBuffer.js';
import * as shaderResources from './core/shader_resources.js';
import Renderable from './Renderable.js';
import Transform from './transforms.js';
import Camera from './Camera.js';
import * as input from './input.js';
import * as text from './resources/text.js';
import * as xmlResource from './resources/xml.js';
import GameScene from './game_scene.js';
import * as gameLoop from './core/gameLoop.js';
import * as audio from './resources/audio.js';

function init(htmlCanvasID){
    glSystem.init(htmlCanvasID);
    vertexBuffer.init();
    shaderResources.init();
    input.init();
    audio.init();
}

function clearCanvas(color){
    let gl = glSystem.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function cleanUp(){
    input.cleanUp();
    gameLoop.cleanUp();
    shaderResources.cleanUp();
    vertexBuffer.cleanUp();
    glSystem.cleanUp();
    audio.cleanUp();
}

console.log('running..');

export default {Renderable, Transform, Camera, GameScene, init, input, text, audio, xmlResource, cleanUp, clearCanvas};
