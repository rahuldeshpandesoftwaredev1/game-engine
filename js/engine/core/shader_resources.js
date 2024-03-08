'use strict';
import SimpleShader from '../simple_shader.js';

const simpleVertexShader = 'engine/glsl_shaders/simple_vs.glsl';
const simpleFragmentShader = 'engine/glsl_shaders/simple_fs.glsl';
let mConstantColorShader = null;

function createShaders(){
    mConstantColorShader = new SimpleShader(simpleVertexShader, simpleFragmentShader);
}

function init(){
    createShaders();
}

function getConstColorShader() {  return mConstantColorShader; }

export {init, getConstColorShader };


