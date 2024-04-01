import * as font from './font.js';
import * as resourceMap from '../core/resource_map.js';

const defaultFont = 'assets/fonts/system_default_font';
const getDefaultFontName = function() { return defaultFont; }

function init(){
    let loadPromise = new Promise(
        async function (resolve){
            await Promise.all([
                font.load(defaultFont)
            ]);
            resolve();
        }).then(
            function resolve(){
                // do nothing.
            }
        );
    resourceMap.pushPromise(loadPromise);
}

function cleanUp(){
    font.unload(defaultFont);
}

export { init, cleanUp, getDefaultFontName }