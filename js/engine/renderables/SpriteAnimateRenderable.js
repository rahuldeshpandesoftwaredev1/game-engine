import SpriteRenderable from "./SpriteRenderable.js";
import * as textureResources from '../resources/texture.js';

const eAnimationType = Object.freeze({
    eRight: 0,
    eLeft: 1,
    eSwing: 2
});

class SpriteAnimateRenderable extends SpriteRenderable {
    constructor(texturePath){
        super(texturePath);

        this.mFirstElementLeft = 0;
        this.mElementTop = 1;
        this.mElementWidth = 1;
        this.mElementHeight = 1;
        this.mUpdateSpriteInterval = 1;
        this.mWidthPadding = 0;
        this.mNumberOfElements = 1;

        this.mUpdateInterval = 1;
        this.mAnimationType = eAnimationType.eLeft;
        this.mCurrentAnimationAdvance = -1;
        this.mCurrentElement = 0;
        this._initAnimation();
    }

    _initAnimation(){
        this.mCurrentTick = 0;
        switch(this.mAnimationType){
            case eAnimationType.eRight:
                this.mCurrentElement = 0;
                this.mCurrentAnimationAdvance = 1;
                break;
            case eAnimationType.eLeft:
                this.mCurrentElement = this.mNumberOfElements - 1;
                this.mCurrentAnimationAdvance = -1;
                break;
            case eAnimationType.eSwing:
                this.mCurrentAnimationAdvance = -1 * this.mCurrentAnimationAdvance;
                this.mCurrentElement += 2 * this.mCurrentAnimationAdvance;
        }
        this._setSpriteElement();
    }

    setSpriteSequence(topPixel, leftPixel, elementWidthInPixel, elementHeightInPixel, numberOfElements, widthPaddingInPixel){
        let textureInfo = textureResources.get(this.myTexturePath);
        let imageWidth = textureInfo.mWidth;
        let imageHeight = textureInfo.mHeight;

        this.mNumberOfElements = numberOfElements;
        this.mFirstElementLeft = leftPixel/imageWidth;
        this.mElementTop =  topPixel/imageHeight;
        this.mElementWidth = elementWidthInPixel/imageWidth;
        this.mElementHeight = elementHeightInPixel/imageHeight;
        this.mWidthPadding = widthPaddingInPixel/imageWidth;
        this._initAnimation();
    }

    _setSpriteElement(){
        let left = this.mFirstElementLeft + 
            (this.mCurrentElement * (this.mElementWidth + this.mWidthPadding));
        super.setElementUVCoordinate(left, left + this.mElementWidth, this.mElementTop - this.mElementHeight,
            this.mElementTop);
    }

    setAnimationType(animationType){
        this.mAnimationType = animationType;
        this.mCurrentAnimationAdvance = -1;
        this.mCurrentElement = 0;
        this._initAnimation();
    }

    setAnimationSpeed(tickInterval){
        this.mUpdateInterval = tickInterval;
    }

    incAnimationSpeed(deltaInterval){
        this.mUpdateInterval += deltaInterval;
    }

    updateAnimation(){
        this.mCurrentTick++;
        if(this.mCurrentTick >= this.mUpdateInterval){
            this.mCurrentTick = 0;
            this.mCurrentElement += this.mCurrentAnimationAdvance;
            if((this.mCurrentElement >= 0) && (this.mCurrentElement < this.mNumberOfElements)){
                this._setSpriteElement();
            }
            else{
                this._initAnimation();
            }
        }
    }
}

export default SpriteAnimateRenderable;
export { eAnimationType }