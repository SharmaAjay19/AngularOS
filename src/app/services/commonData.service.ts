import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CommonDataService {
	//Feature Flags
	public featureFlags = {
		fileUpload: true,
		textEditor: true,
		fileExplorer: true,
		contextMenu: true,
		browser: false,
		audioPlayer: true
	};

	//User-OS Context variables
	public userProfile: any;
	public currentPath: string = "/home/__user__/desktop/";
	public currentPathFiles: any[] = [];
	public userData: any = {};

	//HIDE SHOW FLAGS
	public showContextMenu: boolean = false;

	//Event Emitters
	public currentPathChangedEvent: EventEmitter<any> = new EventEmitter();
	public contextMenuSelectEvent: EventEmitter<any> = new EventEmitter();
	public refreshSystemDataEvent: EventEmitter<any> = new EventEmitter();
	public fileUploadedEvent: EventEmitter<any> = new EventEmitter();
	public openFileInEditorEvent: EventEmitter<any> = new EventEmitter();
	public openBrowserEvent: EventEmitter<any> = new EventEmitter();
	public openAudioPlayerEvent: EventEmitter<any> = new EventEmitter();
	public openFileUploaderEvent: EventEmitter<any> = new EventEmitter();
	public openFileExplorerEvent: EventEmitter<any> = new EventEmitter();
	public constructor(public _http: Http){
		this.userData = {
			"file_system": {
				"files" : [
					{
						"fileid": "",
						"filename": "SherlockHolmes.txt",
						"path": "/home/__user__/desktop/",
						"contents": ""
					},
					{
						"fileid": "",
						"filename": "SherlockHolmes.txt",
						"path": "/home/__user__/document/",
						"contents": ""
					}
				]
			}
		};
	}

	refreshSystemData(data){
		this.userData = data;
		this.refreshSystemDataEvent.emit(true);
	}

	refreshCurrentPathFiles(){
		this.currentPathFiles = this.userData["file_system"]["files"].filter(file => file.path === this.currentPath);
	}

	public rangeQuery(body){
		var url = "";
		this._http.post(url, body, this.buildHeaders()).subscribe((res: Response) => {
		},
		(err) => {
		});
	}

	public deleteUserData(id){
		var url = "";
		this._http.get(url, this.buildHeaders()).subscribe((res: Response) => {
		},
		(err) => {
		});
	}


	public buildHeaders(){
		var serviceHeaders = new Headers();
		serviceHeaders.append("Content-Type", "application/json");
		return new RequestOptions({ headers: serviceHeaders });
	}

}