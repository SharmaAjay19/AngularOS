export enum WindowRendering {
    AudioPlayer = 0,
    TextEditor,
    FileExplorer,
    Terminal
}

export class WindowData {
    windowProperties: WindowProperties;
}

export class WindowProperties {
    type: WindowRendering;
}