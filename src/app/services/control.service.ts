import { Injectable, EventEmitter } from '@angular/core';
import { Event } from '../models/events';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  public exceptionEvent: EventEmitter<Event> = new EventEmitter();
  constructor() { }
}
