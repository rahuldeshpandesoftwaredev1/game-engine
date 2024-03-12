import * as glSystem from './core/gl.js';
import * as vertexBuffer from './core/vertexBuffer.js';
import * as textResources from './resources/text.js';


class SimpleShader{

    constructor(vertexShaderPath, fragmentShaderPath){
        console.log('constreuctor of simple ahader');
        this.mVertexPositionAttributePointer = null;
        this.mPixelColorPointer = null;
        this.mTrsMatrixAttributePointer = null;
        this.mCameraTransformMatrix = null;

        let gl = glSystem.get();
        let vertexShader = compileShader(vertexShaderPath, gl.VERTEX_SHADER);
        let fragmentShader = compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

        this.mCompiledProgram = gl.createProgram();
        gl.attachShader(this.mCompiledProgram, vertexShader);
        gl.attachShader(this.mCompiledProgram, fragmentShader);
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
    }
    return shaderComponent;
}

export default SimpleShader;