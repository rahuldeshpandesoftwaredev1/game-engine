import * as glSystem from '../core/gl.js';
import * as vertexBuffer from '../core/vertexBuffer.js'
import SimpleShader from './simple_shader.js'

class TextureShader extends SimpleShader {
    constructor(vertexShaderPath, fragmentShaderPath){
        super(vertexShaderPath, fragmentShaderPath);
        this.mTextureCoordinateAttribPointer = null;

        let gl = glSystem.get();       
        this.mTextureCoordinateAttribPointer = gl.getAttribLocation(this.mCompiledProgram, 'aTextureCoordinate');
        this.mSamplerReference = gl.getUniformLocation(this.mCompiledProgram, 'textureSampler');
    }

    _getTextureCoordinateBuffer(){
        return vertexBuffer.getTextureCoordinatesBuffer();
    }

    activate(pixelColor, trsMatrix, cameraMatrix){
        super.activate(pixelColor, trsMatrix, cameraMatrix);
        let gl = glSystem.get();
        gl.bindBuffer(gl.ARRAY_BUFFER, this._getTextureCoordinateBuffer());
        gl.vertexAttribPointer(this.mTextureCoordinateAttribPointer, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.mTextureCoordinateAttribPointer);
        gl.uniform1i(this.mSamplerReference, 0);
    }
}

export default TextureShader;