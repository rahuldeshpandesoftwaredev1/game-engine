import * as glSystem from '../core/gl.js';
import * as vertexBuffer from '../core/vertexBuffer.js';
import * as textResources from '../resources/text.js';


class SimpleShader{

    constructor(vertexShaderPath, fragmentShaderPath){
        console.log('constreuctor of simple shader');
        this.mVertexPositionAttributePointer = null;
        this.mPixelColorPointer = null;
        this.mTrsMatrixAttributePointer = null;
        this.mCameraTransformMatrix = null;
        this.mVertexShader = null;
        this.mFragmentShader = null;

        let gl = glSystem.get();
        this.mVertexShader = compileShader(vertexShaderPath, gl.VERTEX_SHADER);
        this.mFragmentShader = compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

        this.mCompiledProgram = gl.createProgram();
        gl.attachShader(this.mCompiledProgram, this.mVertexShader);
        gl.attachShader(this.mCompiledProgram, this.mFragmentShader);
        gl.linkProgram(this.mCompiledProgram);

        if(!gl.getProgramParameter(this.mCompiledProgram, gl.LINK_STATUS)){
            throw new Error('Error linking shaders to program.');
        }

        this.mVertexPositionAttributePointer = gl.getAttribLocation(this.mCompiledProgram, 'vertexPosition');    
        this.mPixelColorPointer = gl.getUniformLocation(this.mCompiledProgram, 'pixelColor');
        this.mTrsMatrixAttributePointer = gl.getUniformLocation(this.mCompiledProgram, 'uTrsMatrix');
        this.mCameraTransformMatrix = gl.getUniformLocation(this.mCompiledProgram, 'uCameraTransformMatrix');
    }

    activate(pixelColor, trsMatrix, cameraTransformMatrix){
        let gl = glSystem.get();
        gl.useProgram(this.mCompiledProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
        gl.vertexAttribPointer(
            this.mVertexPositionAttributePointer,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.enableVertexAttribArray(this.mVertexPositionAttributePointer);
        gl.uniform4fv(this.mPixelColorPointer, pixelColor);
        gl.uniformMatrix4fv(this.mTrsMatrixAttributePointer, false, trsMatrix);
        gl.uniformMatrix4fv(this.mCameraTransformMatrix, false, cameraTransformMatrix);
    }

    cleanUp(){
        let gl = glSystem.get();
        gl.detachShader(this.mCompiledProgram, this.mVertexShader);
        gl.detachShader(this.mCompiledProgram, this.mFragmentShader);
        gl.deleteShader(this.mVertexShader);
        gl.deleteShader(this.mFragmentShader);
        gl.deleteProgram(this.mCompiledProgram);
    }
}

// this method cannot be accessed outside.
function compileShader(filePath, shaderType){
    let gl = glSystem.get();
    let shaderSource = textResources.get(filePath);
    if(shaderSource == null)
    {
        throw new Error('Warning: ' + shaderSource + ' not found!');
        return null;
    }

    let shaderComponent = gl.createShader(shaderType);
    gl.shaderSource(shaderComponent, shaderSource);
    gl.compileShader(shaderComponent);

    // Check for compiler errors.
    if(!gl.getShaderParameter(shaderComponent, gl.COMPILE_STATUS)){
        console.error('Error compiling shader!', gl.getShaderInfoLog(shaderComponent));
    }
    return shaderComponent;
}



export default SimpleShader;