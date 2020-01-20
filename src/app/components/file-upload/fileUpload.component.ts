import { Component, ViewChild, HostListener } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';
import { v4 as uuid } from 'uuid';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

declare var $ : any;
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./fileUpload.component.css']
})
export class FileUploadComponent {

    ESCAPE_KEYCODE = 27;

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.keyCode === this.ESCAPE_KEYCODE) {
          //this.showFileUpload = false;
        }
    }

    closeWindow(){
      this.showFileUpload = false;
      this.reset();
    }

    showFileUpload: boolean = false;
    urlInput: string = "";
    public constructor(public commonDataService: CommonDataService){
      this.commonDataService.openFileUploaderEvent.subscribe(data => {
        if (data){
          this.showFileUpload = !this.showFileUpload;
        }
      });

      this.commonDataService.refreshSystemDataEvent.subscribe(data => {
        this.closeWindow();
      });
    }

    ngOnInit(){
    }

    loadUrl(){

    }

    setAsHome(){
      this.commonDataService.refreshSystemData(JSON.parse(this.fileContent));
    }

    saveFile(){
      var uploadsFolder = this.commonDataService.getOrCreateFolder("root/home/__user__/uploads");
      var fileid = uuid();
			var newFile = {
				"type": "file",
				"fileid": fileid,
				"filename": this.fileName,
				"path": fileid,
				"contents": this.fileContent
			};
      this.commonDataService.addFile(newFile, uploadsFolder);
      this.reset();
      this.commonDataService.fileUploadedEvent.emit(true);
      this.commonDataService.refreshCurrentPathFiles();
    }

    reset(){
      this.fileName = null;
      this.fileSize = null;
      this.fileContent = null;      
    }

    //FILE DROP CODE
    public files: UploadFile[] = [];
    public fileName: string = null;
    public fileSize: any = null;
    public fileContent: string = null;
    public dropped(event: UploadEvent) {
      this.files = event.files;
      var self = this;
      for (const droppedFile of event.files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            var reader = new FileReader();
            reader.onload = (function(aFile){
              return function(e){
                self.fileName = file.name;
                self.fileSize = file.size;
                self.fileContent = e.target.result;
              }
            })(file);
            reader.readAsText(file);  
          });
        }
        else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        }
      }
    }
}