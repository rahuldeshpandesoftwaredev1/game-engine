'use strict';
import * as resourceMap from '../core/resource_map.js';

let unload = resourceMap.unload;
let has = resourceMap.has;
let get = resourceMap.get;

function decodeText(data){
    return data.text();
}

function parseText(text){
    return text;
}

function load(path){
    return resourceMap.loadDecodeParse(path, decodeText, parseText);
}

export {has, get, load, unload}
