import { Component, HostListener, OnInit, Input } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';
import { WindowData } from '../../models/windowRendering';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  ESCAPE_KEYCODE = 27;
  @Input() windowData: WindowData;
  windowWidth = "700px";
  windowHeight = "400px";
  windowOpen: boolean = true;
  windowHeader: string = "DynamicWindow";
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE_KEYCODE) {
      this.closeWindow();
    }
  }

  closeWindow(){
    if (this.windowOpen){
      this.windowOpen = false;
    }
  }

	public constructor(public commonDataService: CommonDataService){
		this.commonDataService.refreshSystemDataEvent.subscribe(data => {
			this.closeWindow();
		});
	}

	ngOnInit(){
	}

}
