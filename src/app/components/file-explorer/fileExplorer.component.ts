import { Component, ViewChild, HostListener } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';
import { v4 as uuid } from 'uuid';

declare var $ : any;
@Component({
  selector: 'app-file-explorer',
  templateUrl: './fileExplorer.component.html',
  styleUrls: ['./fileExplorer.component.css']
})
export class FileExplorerComponent {

    ESCAPE_KEYCODE = 27;

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.keyCode === this.ESCAPE_KEYCODE) {
          this.showExplorer = false;
        }
    }

    showExplorer: boolean = false;
    public constructor(public commonDataService: CommonDataService){
      this.commonDataService.openFileExplorerEvent.subscribe(data => {
        this.showExplorer = !this.showExplorer;
      });
    }

    ngOnInit(){
    }
}