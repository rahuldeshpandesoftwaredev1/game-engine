import * as defaultFontResources from '../resources/default_resources.js';
import SpriteRenderable from './SpriteRenderable.js';
import * as fontResources from '../resources/font.js';
import Transform from '../transforms.js';

class FontRenderable  {
    constructor(aString){
        this.mFontName = defaultFontResources.getDefaultFontName();
        this.mOneChar = new SpriteRenderable(fontResources.imageName(this.mFontName));
        this.mTransform = new Transform();
        this.mText = aString;
    }
    
    getTransform(){
        return this.mTransform;
    }

    getText(){
        return this.mText;
    }

    setText(text){
        this.mText = text;
        this.setTextHeight(this.getTransform().getHeight());
    }

    getFontName(){
        return this.mFontName;
    }

    setFontName(fontName){
        this.mFontName = fontName;
        this.mOneChar.setTexturePath(fontResources.imageName(this.mFontName));
    }

    setColor(color){
        this.mOneChar.setColor(color);
    }

    getColor(){
        return this.mOneChar.getColor();
    }

    setTextHeight(height){
        let charInfo = fontResources.getCharInfo(this.mFontName, 'A'.charCodeAt(0));
        let width = height * charInfo.mCharAspectRatio;
        this.mTransform.setSize(width * this.mText.length, height);
    }

    draw(camera){
        console.log('draw a font');
        let widthOfOneChar = this.mTransform.getWidth();
        let heightOfOneChar = this.mTransform.getHeight();
        let yPosition = this.mTransform.getYPos();
        let xPosition = this.mTransform.getXPos() -(widthOfOneChar/2) + (widthOfOneChar * 0.5);
        let charIndex, aChar, charInfo, xSize, ySize, xOffset, yOffset;
        for(charIndex = 0; charIndex < this.mText.length; charIndex ++){
            aChar = this.mText.charCodeAt(charIndex);
            charInfo = fontResources.getCharInfo(this.mFontName, aChar);
            
            this.mOneChar.setElementUVCoordinate(
                charInfo.mTextureCoordinateLeft,
                charInfo.mTextureCoordinateRight,
                charInfo.mTextureCoordinateBottom,
                charInfo.mTextureCoordinateTop
            );

            xSize = widthOfOneChar * charInfo.mCharWidth;
            ySize = heightOfOneChar * charInfo.mCharHeight;
            this.mOneChar.getTransform().setSize(xSize, ySize);
            console.log('x size = '+ xSize + ' and y size = ' + ySize);
            
            xOffset = widthOfOneChar * charInfo.mCharWidthOffset * 0.5;
            yOffset = heightOfOneChar * charInfo.mCharHeightOffset * 0.5;
            console.log(xPosition + ' for char = ' + aChar);
            this.mOneChar.getTransform().setPosition(xPosition - xOffset, yPosition - yOffset);
            this.mOneChar.draw(camera);
            xPosition += widthOfOneChar;
        }
    }
}

export default FontRenderable;