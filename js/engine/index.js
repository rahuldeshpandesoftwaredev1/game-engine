import * as glSystem from './core/gl.js';
import * as vertexBuffer from './core/vertexBuffer.js';
import * as shaderResources from './core/shader_resources.js';
import Renderable from './Renderable.js';
import Transform from './transforms.js';
import Camera from './Camera.js';
import * as input from './input.js';
import * as text from './resources/text.js';
import * as xmlResource from './resources/xml.js';

function init(htmlCanvasID){
    glSystem.init(htmlCanvasID);
    vertexBuffer.init();
    shaderResources.init();
}

function clearCanvas(color){
    let gl = glSystem.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

console.log('running..');

export default {Renderable, Transform, Camera, init, input, text, xmlResource, clearCanvas};
