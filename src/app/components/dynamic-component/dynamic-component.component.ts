import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { WindowRendering, WindowData } from '../../models/windowRendering';
import { TerminalComponent } from '../terminal/terminal.component';
import { AudioPlayerComponent } from '../audio-player/audioPlayer.component';
import { TextEditorComponent } from '../text-editor/textEditor.component';
import { WindowRenderBaseComponent } from '../window-render-base/window-render-base.component';

@Component({
  selector: 'dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements OnInit {

  @Input() windowData: WindowData;
  @ViewChild('dynamicContainer', { read: ViewContainerRef }) dynamicContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    const component = this.findComponent(this.windowData.windowProperties.type);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.dynamicContainer;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = <WindowRenderBaseComponent>(componentRef.instance);
    instance.windowData = this.windowData;
  }

  findComponent(type: WindowRendering): any{
    switch (type){
      case WindowRendering.AudioPlayer:
        return AudioPlayerComponent;
      case WindowRendering.Terminal:
        return TerminalComponent;
      case WindowRendering.TextEditor:
        return TextEditorComponent;
      default:
        return null;
    }
  }

}
