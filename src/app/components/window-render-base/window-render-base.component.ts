import { Component, OnInit } from '@angular/core';
import { WindowData } from '../../models/windowRendering';

@Component({
  templateUrl: './window-render-base.component.html'
})
export class WindowRenderBaseComponent implements OnInit {

  windowData: WindowData;

  constructor() { }

  ngOnInit() {
  }

}
