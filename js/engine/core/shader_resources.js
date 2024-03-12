'use strict';
import SimpleShader from '../simple_shader.js';
import * as text from '../resources/text.js';
import * as map from './resource_map.js';

const simpleVertexShader = 'engine/glsl_shaders/simple_vs.glsl';
const simpleFragmentShader = 'engine/glsl_shaders/simple_fs.glsl';
let mConstantColorShader = null;

function createShaders(){
    console.log('create shaders now..');
    mConstantColorShader = new SimpleShader(simpleVertexShader, simpleFragmentShader);
}

function init(){
    console.log('init shaders....');
    let loadAllShadersPromise = new Promise(
        async function(resolve){
            await Promise.all(
                [
                    text.load(simpleVertexShader),
                    text.load(simpleFragmentShader)
                ]
            );
            resolve();
        }
    ).then(function resolve(){ 
        console.log('finished loading all shaders..');
        createShaders(); }
    );
    map.pushPromise(loadAllShadersPromise);
}

function getConstColorShader() {  return mConstantColorShader; }

export {init, getConstColorShader };


