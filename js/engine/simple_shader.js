import * as glSystem from './core/gl.js';
import * as vertexBuffer from './core/vertexBuffer.js';

class SimpleShader{

    constructor(vertexShaderPath, fragmentShaderPath){
        this.mVertexPositionAttributePointer = null;
        this.mPixelColorPointer = null;
        this.mTrsMatrixAttributePointer = null;

        let gl = glSystem.get();
        let vertexShader = loadAndCompileShader(vertexShaderPath, gl.VERTEX_SHADER);
        let fragmentShader = loadAndCompileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

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
    }

    activate(pixelColor, trsMatrix){
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
    }
}

// this method cannot be accessed outside.
function loadAndCompileShader(filePath, shaderType){
    let xmlRequest = null;
    let gl = glSystem.get();

    xmlRequest = new XMLHttpRequest();
    xmlRequest.open('GET', filePath, false);
    try{
        xmlRequest.send();
    }
    catch(error){
        throw new Error('could not fetch the shader...');
    }

    let shaderSource = xmlRequest.responseText;
    if(shaderSource == null){
        throw new Error('shader couild not be initlaized..');
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