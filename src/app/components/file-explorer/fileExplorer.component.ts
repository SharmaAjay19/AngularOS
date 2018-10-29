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
    folders: any[] = [];
    public constructor(public commonDataService: CommonDataService){
      this.commonDataService.openFileExplorerEvent.subscribe(data => {
        this.showExplorer = !this.showExplorer;
        this.refreshFileExplorerData();
      });
    }

    refreshFileExplorerData(){
      var allf = Array.from(new Set(this.commonDataService.userData["file_system"]["files"].map(x => x.path)));
      this.folders = allf.map((x: string) => x.replace("/home/__user__/", "").replace("/", ""));
    }

    ngOnInit(){
    }
}