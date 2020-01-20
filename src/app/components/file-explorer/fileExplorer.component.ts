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
    userHomeDir: string = "root/home/__user__";
    timeout: any;

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.keyCode === this.ESCAPE_KEYCODE) {
          /*if (this.showExplorer){
            this.showExplorer = false;
            this.reset();
          }*/
        }
    }

    closeWindow(){
      if (this.showExplorer){
        this.showExplorer = false;
        this.reset();
      }
    }

    showExplorer: boolean = false;
    folders: any[] = [];
    public constructor(public commonDataService: CommonDataService){
      this.commonDataService.openFileExplorerEvent.subscribe(data => {
        this.showExplorer = !this.showExplorer;
        this.refreshFileExplorerData();
      });

      this.commonDataService.contextMenuSelectEvent.subscribe(event => {
        if (event.action === "new"){
          this.refreshFileExplorerData();
        }
      });

      this.commonDataService.fileUploadedEvent.subscribe(data => {
        this.refreshFileExplorerData();
      });

      this.commonDataService.refreshSystemDataEvent.subscribe(data => {
        this.closeWindow();
      });
    }

    refreshFileExplorerData(){
      if (this.timeout){
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        var userHome = this.commonDataService.getPathNodeFromPath(this.userHomeDir);
        this.folders = Object.keys(userHome.children).map(key => userHome.children[key]).filter(path => path.type==="folder").map(x => x.path);
      }, 100);
    }

    displayFolder(folder){
      // WRITE A OS JOIN METHOD FOR THIS
      this.commonDataService.currentPath = "root/home/__user__/" + folder;
      this.commonDataService.refreshCurrentPathFiles();
    }

    reset(){
      this.commonDataService.currentPath = "root/home/__user__/desktop";
      this.commonDataService.refreshCurrentPathFiles();
    }

    ngOnInit(){
      var self = this;
      $('.contextmenu-clickable').on('contextmenu', function(e){
        self.commonDataService.showContextMenu = true;
        var menu = document.getElementById("contextMenu");
        if (menu){
          menu.setAttribute("style", "top: " + e.pageY + "px; left: " + e.pageX + "px;");
        }
        e.preventDefault();
      });

      $('.selectable').on('click', function(){
        $(this).css("background", "cyan");
      });
    }
}