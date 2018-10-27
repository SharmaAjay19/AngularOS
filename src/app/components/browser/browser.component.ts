import { Component, ViewChild, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonDataService } from '../../services/commonData.service';
import { v4 as uuid } from 'uuid';

declare var $ : any;
@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent {

    ESCAPE_KEYCODE = 27;

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.keyCode === this.ESCAPE_KEYCODE) {
          this.showBrowser = false;
          this.pageUrl = "https://www.google.com";
        }
    }

    showBrowser: boolean = false;
    pageTitle: string = "Angular Browser";
    pageUrl: SafeResourceUrl;
    urlInput: string = "";
    public constructor(public commonDataService: CommonDataService,
                       private _sanitizationService: DomSanitizer){
      this.commonDataService.openBrowserEvent.subscribe(url => {
        if (url){
          this.pageUrl = this.sanitizeUrl(url);
        }
        else{
          this.pageUrl = this.sanitizeUrl("https://www.google.com");
        }
        this.showBrowser = true;
        console.log(this.pageUrl);
      });
    }

    sanitizeUrl(url){
      return this._sanitizationService.bypassSecurityTrustResourceUrl(url);
    }

    ngOnInit(){
      this.pageUrl = this.sanitizeUrl("https://www.google.com");
    }

    loadUrl(){
      if (this.urlInput){
        this.pageUrl = this.sanitizeUrl(this.urlInput);
      }
      else{
        this.pageUrl = this.sanitizeUrl("https://www.google.com");
      }
      console.log(this.pageUrl);
    }

}