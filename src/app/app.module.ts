import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng4-click-outside';
import { HttpModule } from '@angular/http';

import {DesktopComponent} from './components/desktop/desktop.component';
import {ContextMenuComponent} from './components/context-menu/contextMenu.component';
import { AppComponent } from './app.component';

import {CommonDataService} from './services/commonData.service';


@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    ClickOutsideModule,
    HttpModule
  ],
  providers: [CommonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
