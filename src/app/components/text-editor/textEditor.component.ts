import { Component, ViewChild, HostListener } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';
import { v4 as uuid } from 'uuid';
import { Path } from '../../models/filesystem';

declare var $ : any;
@Component({
  selector: 'app-text-editor',
  templateUrl: './textEditor.component.html',
  styleUrls: ['./textEditor.component.css']
})
export class TextEditorComponent {
	
  	ESCAPE_KEYCODE = 27;
  	S_KEYCODE = 83;
	editorWidth = "700px";
	editorHeight = "400px";
  	@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  		if (event.ctrlKey && event.keyCode === this.S_KEYCODE){
  			this.saveFile();
  			event.preventDefault();
  		}
	    if (event.keyCode === this.ESCAPE_KEYCODE) {
	    	if (this.editorOpen){
	      		this.editorOpen = false;
	      		this.reset();
	  		}
	    }
  	}

  	closeWindow(){
  		if (this.editorOpen){
	  		this.editorOpen = false;
	  		this.reset();
	  	}
  	}

  	file: any = {};
	editorOpen: boolean = false;
	editorConfig: any;
	editorContent: string = "";

	public constructor(public commonDataService: CommonDataService){
		this.commonDataService.openFileInEditorEvent.subscribe(file => {
			this.file = file;
			this.editorContent = JSON.parse(JSON.stringify(this.file.contents));
			this.openEditor();
		});

		this.commonDataService.refreshSystemDataEvent.subscribe(data => {
			this.closeWindow();
		});
	}

	openEditor(){
		if (!this.file){
			var currentPathNode = this.commonDataService.getPathNodeFromPath(this.commonDataService.currentPath);
			var fileid = uuid();
			this.file = <Path>{
				"type": "file",
				"fileid": fileid,
				"filename": "New File.txt",
				"path": fileid,
				"contents": ""
			}
			this.commonDataService.addFile(this.file, currentPathNode);
		}
		this.editorOpen = true;
	}

	saveFile(){
		if (this.file){
			this.file.contents = this.editorContent;
		}
	}

	reset(){
		this.file = null;
		this.editorContent = "";
	}

	ngOnInit(){
		this.editorConfig = {
		    "editable": true,
		    "spellcheck": true,
		    "height": this.editorHeight,
		    "minHeight": window.innerHeight*0.3 + "px",
		    "width": this.editorWidth,
		    "minWidth": window.innerWidth*0.3 + "px",
		    "translate": "yes",
		    "enableToolbar": true,
		    "showToolbar": true,
		    "placeholder": "Enter text here...",
		    "imageEndPoint": "",
		    "toolbar": [
		        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
		        ["fontName", "fontSize", "color"],
		        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
		        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
		        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
		        ["link", "unlink", "image", "video"]
		    ]
		}
	}
}
  