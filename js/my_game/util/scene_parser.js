import engine from '../../engine/index.js';

class ParserConstants {
    static get Camera(){
        return 'Camera';
    }
    static get CenterX(){
        return 'CenterX';
    }
    static get CenterY(){
        return 'CenterY';
    }
    static get Width(){
        return 'Width';
    }
    static get Viewport(){
        return 'Viewport';
    }
    static get BgColor(){
        return 'BgColor';
    }
    static get PosX(){
        return 'PosX';
    }
    static get PosY(){
        return 'PosY';
    }
    static get Height(){
        return 'Height';
    }
    static get Rotation(){
        return 'Rotation';
    }
    static get Color(){
        return 'Color';
    }
    static get Square(){
        return 'Square';
    }
}


class SceneFileParser {
    constructor(xml){
        console.log(xml);
        this.xml = xml;
    }
    
    parseCamera(){
        let cameraElement = getElement(this.xml, ParserConstants.Camera);
        let cameraX = Number(cameraElement[0].getAttribute(ParserConstants.CenterX));
        let cameraY = Number(cameraElement[0].getAttribute(ParserConstants.CenterY));
        let width =  Number(cameraElement[0].getAttribute(ParserConstants.Width));
        let viewport = cameraElement[0].getAttribute(ParserConstants.Viewport).split(" ");
        let backgroundColor = cameraElement[0].getAttribute(ParserConstants.BgColor).split(" ");
        let j;
        for(j = 0; j < 4; j++){
            backgroundColor[j] = Number(backgroundColor[j]);
            viewport[j] = Number(viewport[j]);
        }
        let camera = new engine.Camera(
            vec2.fromValues(cameraX, cameraY),
            width,
            viewport
        );
        camera.setBackgroundColor(backgroundColor);
        return camera;
    }

    parseSquares(squareSet){
        let element = getElement(this.xml, ParserConstants.Square);
        let i, j, xPosition, yPosition, width, height, rotation, color, square;
        for(i = 0; i < element.length; i++){
            xPosition = Number(element.item(i).attributes.getNamedItem(ParserConstants.PosX).value);
            yPosition = Number(element.item(i).attributes.getNamedItem(ParserConstants.PosY).value);
            width = Number(element.item(i).attributes.getNamedItem(ParserConstants.Width).value);
            height = Number(element.item(i).attributes.getNamedItem(ParserConstants.Height).value);
            rotation = Number(element.item(i).attributes.getNamedItem(ParserConstants.Rotation).value);
            color = element.item(i).attributes.getNamedItem(ParserConstants.Color).value.split(' ');
            square = new engine.Renderable();
            for(j = 0; j < 4; j++){
                color[j] = Number(color[j]);
            }
            square.setColor(color);
            square.getTransform().setPosition(xPosition, yPosition);
            square.getTransform().setRotationInDegrees(rotation);
            square.getTransform().setSize(width, height);
            squareSet.push(square);
        }
    }
}

function getElement(xmlContent, tagName){
    let theElement = xmlContent.getElementsByTagName(tagName);
    if (theElement.length == 0){
        console.error('element of tag name = ' + tagName + ' NOT found');
    }
    return theElement;
}

export default SceneFileParser;