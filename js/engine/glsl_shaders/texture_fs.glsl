// Sampler to work with texture 
uniform sampler2D textureSampler;

precision mediump float; 

// Useful for tinting
uniform vec4 pixelColor;

// Interpolated texture coordinate
varying vec2 vTextureCoordinate;

void main(void){
    // Obtain the texture color value
    vec4 colorValue = texture2D(textureSampler, vec2(vTextureCoordinate.s, vTextureCoordinate.t));
    // Tint the texture if you want
    vec3 tintedValue = vec3(colorValue) *  (1.0 - pixelColor.a) + vec3(colorValue) * pixelColor.a;
    vec4 result = vec4(tintedValue, colorValue.a);
    // Set the color of the pixel
    gl_FragColor = result;
}