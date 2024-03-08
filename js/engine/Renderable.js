import * as glSystem from './core/gl.js';
import * as shaderResources from './core/shader_resources.js';
import Transform from './transforms.js';

class Renderable{
    constructor(){
        this.mShader = shaderResources.getConstColorShader();
        this.mColor = [1,1,1,1];
        this.mTransform = new Transform();
    }

    getTransform(){
        return this.mTransform;
    }

    draw(){
        let gl = glSystem.get();
        console.log(this.mTransform.getTRSMatrix());
        this.mShader.activate(this.mColor, this.mTransform.getTRSMatrix());
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    setColor(color){
        this.mColor = color;
    }

    getColor(){
        return this.mColor;
    }
}

export default Renderable;
