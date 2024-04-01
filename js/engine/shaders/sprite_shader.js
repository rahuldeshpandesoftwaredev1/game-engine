import * as glSystem from  '../core/gl.js'
import TextureShader from './texture_shader.js';

class SpriteShader extends TextureShader {

    constructor(vertexShaderPath, fragmentShaderPath){
        super(vertexShaderPath, fragmentShaderPath);
        
        this.mTextureCoordinateBuffer = null;
        let initialTextureCoordinates = 
        [
            1.0, 1.0, // top right,
            0.0, 1.0, // top left,
            1.0, 0.0, // bottom right
            0.0, 0.0 // bottom left
        ];

        let gl = glSystem.get();
        this.mTextureCoordinateBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTextureCoordinateBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initialTextureCoordinates), gl.DYNAMIC_DRAW);
    }

    setTextureCoordinates(textureCoordinates){
        let gl = glSystem.get();
//        console.log('in sprite shader, coord = ' + textureCoordinates);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mTextureCoordinateBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(textureCoordinates));
    }

    _getTextureCoordinateBuffer(){
//        console.log('get texture buffer for sprite shader. = ' + this.mTextureCoordinateBuffer);
        return this.mTextureCoordinateBuffer;
    }
}

export default SpriteShader;