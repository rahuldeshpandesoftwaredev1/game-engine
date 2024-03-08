class Transform{

    constructor(){
        this.mPosition = vec2.fromValues(0,0);
        this.mScale = vec2.fromValues(1,1);
        this.mRotationInRadians = 0.0;
    }

    getXPos(){
        return this.mPosition[0];
    }

    getYPos(){
        return this.mPosition[1];
    }

    setXPos(xPosition){
        this.mPosition[0] = xPosition;
    }

    setYPos(yPosition){
        this.mPosition[1] = yPosition;
    }

    setPosition(xPosition, yPosition)
    {
        this.setXPos(xPosition);
        this.setXPos(yPosition);
    }

    getPosition(){
        return this.mPosition;
    }

    getWidth(){
        return this.mScale[0];
    }
    
    getHeight(){
        return this.mScale[1];
    }

    setWidth(width){
        this.mScale[0] = width;
    }

    setHeight(height){
        this.mScale[1] = height;
    }
    
    setSize(width, height){
        this.setWidth(width);
        this.setHeight(height);
    }

    getSize(){
        return this.mScale;
    }

    setRotationInRadians(rotationInRadians){
        this.mRotationInRadians = rotationInRadians;
        while(this.mRotationInRadians > 2 * Math.PI)
        {
            this.mRotationInRadians -= (2 * Math.PI);
        }
    }
    
    setRotationInDegrees(rotationInDegree){
        this.setRotationInRadians(rotationInDegree * Math.PI / 180.0);
    }

    getRotationInRadians(){
        return this.mRotationInRadians;
    }

    getRotationInDegrees(){
        return (this.mRotationInRadians * 180)/Math.PI;
    }

    getTRSMatrix(){
        let matrix = mat4.create();
        mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0));
        mat4.rotateZ(matrix, matrix, this.getRotationInRadians());
        mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
        return matrix;
    }
}

export default Transform;