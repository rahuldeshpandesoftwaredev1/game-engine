import Renderable from './Renderable.js';
import * as shaderResources from '../core/shader_resources.js';
import * as textureResources from '../resources/texture.js';

class TextureRenderable extends Renderable {
    /**
     * 
     * @param {TextureInfo instance} myTexture 
     */
    constructor(myTexturePath){
        super();
        // This is the transparency color.
        super.setColor([1,1,1,0]);
        super._setShader(shaderResources.getConstantTextureShader());        
        this.myTexturePath = myTexturePath;
    }

    draw(camera){
        // Activate respective texture to draw.
        textureResources.activate(this.myTexturePath);
        super.draw(camera);
    }

    getTexturePath(){
        return this.myTexturePath;
    }

    setTexturePath(newTexture){
        this.myTexture = newTexture;
    }
}

export default TextureRenderable;