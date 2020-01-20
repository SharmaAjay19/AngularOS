import { Path } from "./filesystem";

export class PathStack {
    elements: Path[];
    lastIndex: number;

    public constructor(path?: Path){
        this.elements = [];
        this.lastIndex = 0;
        if (path){
            this.push(path);
        }
    }

    public push(element: Path){
        if (element.path && element.path.length>0){
            this.elements.push(element);
            this.lastIndex++;
        }
    }

    public pop(){
        this.elements.splice(this.lastIndex-1, 1);
    }
}