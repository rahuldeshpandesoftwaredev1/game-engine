// Vertex shader code
attribute vec3 vertexPosition;

// Texture coordinate
attribute vec2 aTextureCoordinate; 

// Pass this value to fragment shader
varying vec2 vTextureCoordinate;

uniform mat4 uTrsMatrix;
uniform mat4 uCameraTransformMatrix;

void main(){
    // Pass position to the vertex shader
    gl_Position = uCameraTransformMatrix * uTrsMatrix * vec4(vertexPosition, 1.0);

    vTextureCoordinate = aTextureCoordinate;
}
