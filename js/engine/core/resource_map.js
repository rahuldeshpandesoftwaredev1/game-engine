class MapEntry{
    constructor(data){
        this.mData = data;
        this.mReferenceCount = 1;
    }
    decrementReference(){
        this.mReferenceCount--;
    }
    incrementReference(){
        this.mReferenceCount++;
    }
    set(data){
        this.mData = data;
    }
    data(){
        return this.mData;
    }
    canRemove(){
        return this.mReferenceCount == 0;
    }
}

let mMap = new Map();
let mOutstandingPromises = [];

function has(path){
    return mMap.has(path);
}

function get(path){
    if(!has(path)){
        throw new Error('resource not present.');
    }
    return mMap.get(path).data();
}

function set(key, value){
    mMap.get(key).set(value);
}

function loadRequested(path){
    // data not present at the moment.
    mMap.set(path, new MapEntry(null));
}

function incrementReference(path){
    mMap.get(path).incrementReference();
}

function unload(path){
    let entry = mMap.get(path);
    entry.decrementReference();
    if(entry.canRemove()){
        console.log('deleting resource at path = ' + path);
        mMap.delete(path);
    }
    return entry.canRemove();
}

function pushPromise(p){
    mOutstandingPromises.push(p);
}

function loadDecodeParse(path, decodeResource, parseResource){
    let fetchPromise = null;
    if(!has(path)){
        loadRequested(path);
        fetchPromise = fetch(path)
            .then(res => decodeResource(res))
            .then(data => parseResource(data))
            .then(data => { return set(path, data) })
            .catch(error => {throw error});
    }
    else{
        incrementReference(path);
    }
    return fetchPromise;
}

async function waitOnPromises(){
    await Promise.all(mOutstandingPromises);
    mOutstandingPromises = [];
}

export {has, get, set, loadRequested, incrementReference, loadDecodeParse, unload, pushPromise, waitOnPromises};