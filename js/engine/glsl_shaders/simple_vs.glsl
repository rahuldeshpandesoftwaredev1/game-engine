// Vertex shader code
attribute vec3 vertexPosition;
uniform mat4 uTrsMatrix;
uniform mat4 uCameraTransformMatrix;

void main(){
    // Pass position to the vertex shader
    gl_Position = uCameraTransformMatrix * uTrsMatrix * vec4(vertexPosition, 1.0);
}
