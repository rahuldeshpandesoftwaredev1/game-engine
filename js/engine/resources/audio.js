'use strict';
import * as resourceMap from '../core/resource_map.js';

let unload = resourceMap.unload;
let get = resourceMap.get;
let has = resourceMap.has;

let mAudioContext = null;
// background setting
let mBackgroundAudio = null;
let mBackgroundGain = null;
// cue setting
let mCueGain = null;
// gain for both the cue and background.
let mMasterGain = null;
let kDefaultInitGain = 0.1;


function initAudioContext(){
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    mAudioContext = new AudioContext();
}

function enableAudioSupport(){
    if(mAudioContext == null){
        initAudioContext();
    }
//    mAudioContext.resume();
}

function decodeResource(data){
    return data.arrayBuffer();
}

function parseResource(data){
    return mAudioContext.decodeAudioData(data);
}

function load(path){
    return resourceMap.loadDecodeParse(path, decodeResource, parseResource);
}

function init(){
    try{
        if(mAudioContext == null){
            initAudioContext();
        }
        mMasterGain = mAudioContext.createGain();
        mMasterGain.connect(mAudioContext.destination);
        mMasterGain.gain.value = kDefaultInitGain;

        mBackgroundGain = mAudioContext.createGain();
        mBackgroundGain.connect(mMasterGain);
        mBackgroundGain.gain.value = 1.0;

        mCueGain = mAudioContext.createGain();
        mCueGain.connect(mMasterGain);
        mCueGain.gain.value = 1.0;
    }
    catch(e){
        console.log(e);
        throw new Error('error establishing audio');
    }
}

function playCue(path, volume){
    let source = mAudioContext.createBufferSource();
    source.buffer = resourceMap.get(path);
    source.start(0);

    source.connect(mCueGain);
    mCueGain.gain.value = volume;
}

function playBackground(path, volume){
    if(has(path)){
        console.log('play path = ' + path + ' and vlyme = ' + volume);
        stopBackground();
        mBackgroundAudio = mAudioContext.createBufferSource();
        mBackgroundAudio.buffer = resourceMap.get(path);
        mBackgroundAudio.loop = true;

        mBackgroundAudio.start(0);
        mBackgroundAudio.connect(mBackgroundGain);
        setBackgroundVolume(volume);
    }
}

function stopBackground(){
    if(mBackgroundAudio !== null){
        mBackgroundAudio.stop(0);
        mBackgroundAudio = null;
    }
}

function cleanUp(){
    mAudioContext.close();
    mAudioContext = null;
}

function isBackgroundPlaying(){
    return mBackgroundAudio !== null;
}

function setBackgroundVolume(volume){
    if(mBackgroundGain !== null){
        mBackgroundGain.gain.value = volume;
    }
}

function incBackgroundVolume(increment){
    if(mBackgroundGain !== null){
        console.log('increase bg volume by = ' + increment);
        mBackgroundGain.gain.value += increment;

        if(mBackgroundGain.gain.valule < 0){
            setBackgroundVolume(0);
        }
    }
}

function setMasterVolume(volume){
    if(mMasterGain !== null){
        mMasterGain.gain.value = volume;
    }
}

function incMasterVolume(increment){
    if(mMasterGain !== null){
        mMasterGain.gain.value += increment;

        if(mMasterGain.gain.value < 0){
            mMasterGain.gain.value = 0;
        }
    }
}

export {init, enableAudioSupport, cleanUp, has, load, unload, playCue, playBackground, stopBackground, isBackgroundPlaying, setBackgroundVolume, incBackgroundVolume, setMasterVolume, incMasterVolume  }