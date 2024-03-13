import * as glSystem from '../core/gl.js';
import * as resourceMap from '../core/resource_map.js';
let has = resourceMap.has;
let get = resourceMap.get;

class TextureInfo {
    constructor(width, height, id){
        this.mWidth = width;
        this.mHeight = height;
        this.mGLTextureID = id;
    }
}

function load(texturePath){
    resourceMap.loadRequested(texturePath);
    let image = new Image();
    let texturePromise = new Promise(function(afterPromiseSuccess){
        image.onload = afterPromiseSuccess;
        image.src = texturePath;
    }).then(function afterPromiseSuccess(){
        processLoadedImage(texturePath, image);
    });
    resourceMap.pushPromise(texturePromise);
    return texturePromise;
}

function unload(texturePath){
    let textureInfo = get(texturePath);
    if(resourceMap.unload(texturePath)){
        let gl = glSystem.get();
        gl.deleteTexture(textureInfo.mGLTextureID);
    }
}

function processLoadedImage(texturePath, image){
    let gl = glSystem.get();
    let textureID = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textureID);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
    let textureInfo = new TextureInfo(image.naturalWidth, image.naturalHeight, textureID);
    resourceMap.set(texturePath, textureInfo);
}

/**
 * Activate the texture so we can draw it.
 * @param {The path to the texture to draw.} texturePath 
 */
function activate(texturePath){
    let gl = glSystem.get();
    let textureInfo = get(texturePath);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureInfo.mGLTextureID);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Handling magnification.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
}

function deactivate(){
    let gl = glSystem.get();
    gl.bindTexture(gl.TEXTURE_2D, null);
}

export {has, get, load, unload, TextureInfo, activate, deactivate}