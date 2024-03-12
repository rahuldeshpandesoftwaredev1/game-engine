'use strict'
import * as resourceMap from '../core/resource_map.js';
let unload = resourceMap.unload;
let has = resourceMap.has;
let get = resourceMap.get;

let xmlDomParser = new DOMParser();

function decodeXML(data){
    return data.text();
}

function parseXML(xml){
    console.log('parse the xml')
    return xmlDomParser.parseFromString(xml, 'text/xml');
}

function load(path){
    let promise =  resourceMap.loadDecodeParse(path, decodeXML, parseXML);
    resourceMap.pushPromise(promise);
}

export {has, get, load, unload}