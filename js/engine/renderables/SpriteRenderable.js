import TextureRenderable from './TextureRenderable.js';
import * as shaderResources from '../core/shader_resources.js';
import * as textureResources from '../resources/texture.js';

const eTextureCoordinateArrayIndex = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});

class SpriteRenderable extends TextureRenderable {
    constructor(myTexture){
        super(myTexture);
        super._setShader(shaderResources.getConstantSpriteShader());
        this.mTextureLeftCoordinate = 0.0;
        this.mTextureRightCoordinate = 1.0;
        this.mTextureTopCoordinate = 1.0;
        this.mTextureBottomCoordinate = 0.0;
    }

    setElementUVCoordinate(left, right, bottom, top){
        this.mTextureLeftCoordinate = left;
        this.mTextureRightCoordinate = right;
        this.mTextureBottomCoordinate = bottom;
        this.mTextureTopCoordinate = top;
    }

    setElementPixelPositions(left, right, bottom, top){
//        console.log('bottom = ' + bottom + ' and top = ' + top);
        let textureInfo = textureResources.get(this.myTexturePath);
        let imageWidth = textureInfo.mWidth;
        let imageHeight = textureInfo.mHeight;
  //      console.log('width = ' + imageWidth + ' and height = ' + imageHeight);
        this.mTextureLeftCoordinate = left/imageWidth;
        this.mTextureRightCoordinate = right/imageWidth;
        this.mTextureTopCoordinate = top/imageHeight;
        this.mTextureBottomCoordinate = bottom/imageHeight;
    }

    getElementUVCoordinateArray(){
        return [
            this.mTextureRightCoordinate, this.mTextureTopCoordinate,
            this.mTextureLeftCoordinate, this.mTextureTopCoordinate,
            this.mTextureRightCoordinate, this.mTextureBottomCoordinate,
            this.mTextureLeftCoordinate, this.mTextureBottomCoordinate
        ];
    }

    draw(camera){
//        console.log('drawing the sprite renderable..');
        this.mShader.setTextureCoordinates(this.getElementUVCoordinateArray());
        super.draw(camera);
    }
}

export default SpriteRenderable;
export { eTextureCoordinateArrayIndex };