import * as xml from './xml.js';
import * as texture from './texture.js';

const fontExtension = '.fnt';
const imageExtension = '.png';

class CharacterInfo {
    constructor(){
        this.mTextureCoordinateLeft = 0;
        this.mTextureCoordinateRight = 1;
        this.mTextureCoordinateBottom = 0;
        this.mTextureCoordinateTop = 1;
        this.mCharWidth = 1;
        this.mCharHeight = 1;
        this.mCharWidthOffset = 0;
        this.mCharHeightOffset = 0;
        this.mCharAspectRatio = 1;
    }
}

function descName(fontName){
    return fontName + fontExtension;
}

function imageName(fontName){
    return fontName + imageExtension;
}

function load(fontName){
    xml.load(descName(fontName));
    texture.load(imageName(fontName));
}

function unload(fontName){
    xml.unload(descName(fontName));
    texture.unload(imageName(fontName));
}

function has(fontName){
    return texture.has(imageName(fontName)) && xml.has(descName(fontName));
}

function getCharInfo(fontName, aChar){
    let returnInfo = null;
    let fontInfo = xml.get(descName(fontName));
    let commonPath = 'font/common';
    let commonInfo = fontInfo.evaluate(commonPath, fontInfo, null, XPathResult.ANY_TYPE, null);
    commonInfo = commonInfo.iterateNext();
    if(commonInfo === null){
        return returnInfo;
    }

    let charHeight = commonInfo.getAttribute('base');
    let charPath = 'font/chars/char[@id = ' + aChar + ']';
    let charInfo = fontInfo.evaluate(charPath, fontInfo, null, XPathResult.ANY_TYPE, null);
    charInfo = charInfo.iterateNext();

    if(charInfo === null){
        return returnInfo;
    }

    returnInfo = new CharacterInfo();
    let texInfo = texture.get(imageName(fontName));
    let leftPixel = Number(charInfo.getAttribute('x'));
    let rightPixel = leftPixel + Number(charInfo.getAttribute('width')) - 1;
    let topPixel = (texInfo.mCharHeight - 1) - Number(charInfo.getAttribute('y'));
    let bottomPixel = topPixel - Number(charInfo.getAttribute('height')) + 1;

    returnInfo.mTextureCoordinateLeft = leftPixel / (texInfo.mCharWidth - 1);
    returnInfo.mTextureCoordinateTop = topPixel / (texInfo.mCharHeight - 1);
    returnInfo.mTextureCoordinateRight = rightPixel / (texInfo.mCharWidth - 1);
    returnInfo.mTextureCoordinateBottom = bottomPixel / (texInfo.mCharHeight  - 1);

    // relative character size
    let charWidth = charInfo.getAttribute("xadvance");
    returnInfo.mCharWidth = charInfo.getAttribute("width") / charWidth;
    returnInfo.mCharHeight = charInfo.getAttribute("height") / charHeight;
    returnInfo.mCharWidthOffset = charInfo.getAttribute("xoffset") / charWidth;
    returnInfo.mCharHeightOffset = charInfo.getAttribute("yoffset") / charHeight;
    returnInfo.mCharAspectRatio = charWidth / charHeight;
    
    console.log('finished setting char info..');
    return returnInfo;
}

export {
    has, load, unload, imageName, descName, CharacterInfo, getCharInfo
}