import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng4-click-outside';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import {FormsModule} from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';

import {DesktopComponent} from './components/desktop/desktop.component';
import {ContextMenuComponent} from './components/context-menu/contextMenu.component';
import {TextEditorComponent} from './components/text-editor/textEditor.component';
import { AppComponent } from './app.component';

import {CommonDataService} from './services/commonData.service';


@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    ContextMenuComponent,
    TextEditorComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    HttpClientModule,
    HttpModule,
    NgxEditorModule,
    FormsModule,
    AngularDraggableModule
  ],
  providers: [CommonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
