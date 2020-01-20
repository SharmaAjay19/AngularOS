export class PathNode{
    public type: string;
    public path: string;
    public children?: any;
}

export class Path extends PathNode {
    public fileid?: string;
    public filename?: string;
    public contents?: string;
}

export class FileUtilities{
    public addFile(file: Path, parent: Path){

    }

    public addFolder(folder: Path, parent: Path){
        if(parent.children.hasOwnProperty(folder.path)){

        }
    }
}