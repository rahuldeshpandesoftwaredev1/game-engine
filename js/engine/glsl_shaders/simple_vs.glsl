// Vertex shader code
attribute vec3 vertexPosition;
uniform mat4 uTrsMatrix;
void main(){
    // Pass position to the vertex shader
    gl_Position = uTrsMatrix * vec4(vertexPosition, 1.0);
}
