'use strict';
import * as input from '../input.js';
import * as map from './resource_map.js';

const kUpdatePerSecond = 60;
// How many milliseconds should every update take.
const kMPU = 1000/kUpdatePerSecond;
let mPreviousTime;
let mLagTime;
let mLoopRunning = false;
let mCurrentScene = false;
let mFrameID = -1;

function gameLoop(){
    if(mLoopRunning){
        mFrameID = requestAnimationFrame(gameLoop);
        mCurrentScene.draw();

        let currentTime = performance.now();
        let elapsedTime = currentTime - mPreviousTime;
        mPreviousTime = currentTime;
        mLagTime += elapsedTime;

        while ((mLagTime >= kMPU) && mLoopRunning){
            input.update();
            mCurrentScene.update();
            mLagTime -= kMPU;
        }
    }
}

async function start(scene){
    if(mLoopRunning){
        throw new Error('loop is already running...');
    }

    mCurrentScene = scene;
    mCurrentScene.loadResources();

    // Ensure all resources are loaded.
    await map.waitOnPromises();
    input.init();
    mCurrentScene.init();

    mPreviousTime = performance.now();
    mLagTime = 0.0;
    mLoopRunning = true;
    mFrameID = requestAnimationFrame(gameLoop);
}

function stop(){
    mLoopRunning = false;
    cancelAnimationFrame(mFrameID);
}

export {start, stop};