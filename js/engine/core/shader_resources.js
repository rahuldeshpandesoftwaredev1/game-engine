'use strict';
import SimpleShader from '../shaders/simple_shader.js';
import TextureShader from '../shaders/texture_shader.js';
import * as text from '../resources/text.js';
import * as map from './resource_map.js';

const simpleVertexShader = 'engine/glsl_shaders/simple_vs.glsl';
const simpleFragmentShader = 'engine/glsl_shaders/simple_fs.glsl';
const textureVertexShader = 'engine/glsl_shaders/texture_vs.glsl';
const textureFragmentShader = 'engine/glsl_shaders/texture_fs.glsl';
let mConstantColorShader = null;
let mConstantTextureShader = null;

function createShaders(){
    console.log('create shaders now..');
    mConstantColorShader = new SimpleShader(simpleVertexShader, simpleFragmentShader);
    mConstantTextureShader = new TextureShader(textureVertexShader, textureFragmentShader);
}

function init(){
    console.log('init shaders....');
    let loadAllShadersPromise = new Promise(
        async function(resolve){
            await Promise.all(
                [
                    text.load(simpleVertexShader),
                    text.load(simpleFragmentShader),
                    text.load(textureVertexShader),
                    text.load(textureFragmentShader)
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

function getConstantTextureShader() { return mConstantTextureShader; }

function cleanUp(){
    mConstantColorShader.cleanUp();
    mConstantTextureShader.cleanUp();
    text.unload(simpleVertexShader);
    text.unload(simpleFragmentShader);
    text.unload(textureVertexShader);
    text.unload(textureFragmentShader);
}

export {init, cleanUp, getConstColorShader, getConstantTextureShader };


