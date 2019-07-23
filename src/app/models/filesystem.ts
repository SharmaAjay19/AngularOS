export class File{
    public fileid: string;
    public filename: string;
    public path: string;
    public contents: string;
}

export class FileSystem {
    public files: File[];
}