import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng4-click-outside';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import {FormsModule} from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';
import { FileDropModule } from 'ngx-file-drop';

import {DesktopComponent} from './components/desktop/desktop.component';
import {ContextMenuComponent} from './components/context-menu/contextMenu.component';
import {TextEditorComponent} from './components/text-editor/textEditor.component';
import {BrowserComponent} from './components/browser/browser.component';
import {AudioPlayerComponent} from './components/audio-player/audioPlayer.component';
import {FileUploadComponent} from './components/file-upload/fileUpload.component';
import {FileExplorerComponent} from './components/file-explorer/fileExplorer.component';
import { AppComponent } from './app.component';

import {CommonDataService} from './services/commonData.service';
import { FileComponent } from './components/file/file.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { WindowComponent } from './components/window/window.component';
import { DynamicComponentComponent } from './components/dynamic-component/dynamic-component.component';
import { WindowRenderBaseComponent } from './components/window-render-base/window-render-base.component';
import { ControlService } from './services/control.service';
import { CommandService } from './services/command.service';


@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    ContextMenuComponent,
    TextEditorComponent,
    BrowserComponent,
    AudioPlayerComponent,
    FileUploadComponent,
    FileExplorerComponent,
    FileComponent,
    TerminalComponent,
    WindowComponent,
    DynamicComponentComponent,
    WindowRenderBaseComponent
  ],
  entryComponents: [TerminalComponent],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    HttpClientModule,
    HttpModule,
    NgxEditorModule,
    FormsModule,
    AngularDraggableModule,
    FileDropModule
  ],
  providers: [CommonDataService, ControlService, CommandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
