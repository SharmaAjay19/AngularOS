export class Event {
    type: string;
    level: EventLevel;
    message: string;
    action?: Function;
}

export enum EventLevel {
    Critical,
    Warning,
    Message,
    Success
}