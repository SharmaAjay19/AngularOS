import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Path, PathNode} from '../models/filesystem';
import { WindowData } from '../models/windowRendering';
import { ControlService } from './control.service';
import { Event, EventLevel } from '../models/events';

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
	public windows: WindowData[] = [];

	//User-OS Context variables
	public userProfile: any;
	public currentPath: string = "root/home/__user__/desktop";
	public currentPathFiles: Path[] = [];
	public userData: Path;

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
	public constructor(public _http: Http, public _controlService: ControlService){
		this.userData = {
			"type": "root",
			"path": "",
			"children" : {
				"home": {
					"type": "folder",
					"path": "home",
					"children": {
						"__user__": {
							"type": "folder",
							"path": "__user__",
							"children": {
								"desktop": {
									"type": "folder",
									"path": "desktop",
									"children": {
									}
								}
							}
						}
					}
				}
			}
		};
	}

	refreshSystemData(data){
		this.userData = data;
		this.refreshSystemDataEvent.emit(true);
	}

	refreshCurrentPathFiles(){
		var currentPathNode = this.getPathNodeFromPath(this.currentPath);
		this.currentPathFiles = Object.keys(currentPathNode.children).map(key => currentPathNode.children[key]);
	}

	getPathNodeFromPath(path: string){
		var pathChunks = path.split("/");
		var resultNode = this.userData;
		for (var i=1; i<pathChunks.length; i++){
			if (pathChunks[i] && pathChunks[i].length>0){
				if (resultNode["children"].hasOwnProperty(pathChunks[i])){
					resultNode = resultNode["children"][pathChunks[i]];
				}
				else{
					return null;
				}
			}
		}
		return resultNode;
	}

	getOrCreateFolder(path: string){
		var pathNode = this.getPathNodeFromPath(path);
		if (pathNode && pathNode.path && pathNode.path.length>0)
		return pathNode;
		else{
			var pathChunks = path.split("/").filter(x => x.length>0);
			var folderName = pathChunks[pathChunks.length-1];
			var parentFolder = pathChunks.slice(0, pathChunks.length-1).join("/");
			var folderNode = <PathNode>{
				"type": "folder",
				"path": folderName,
				"children": {}
			}
			var parentNode = this.getOrCreateFolder(parentFolder);
			this.addFolder(folderNode, parentNode);
			return this.getPathNodeFromPath(path);
		}
	}

	addFile(file: Path, parent: PathNode, overwriteDuplicate: boolean = false) {
		if (!file.path || file.path.length===0){
			this._controlService.exceptionEvent.emit(<Event>({
				type: "NullOrEmptyException",
				level: EventLevel.Warning,
				message: `File path is null or empty`
			}));
			return;
		}
		if (parent.children.hasOwnProperty(file.path) && !overwriteDuplicate) {
			this._controlService.exceptionEvent.emit(<Event>({
				type: "FileExists",
				level: EventLevel.Warning,
				message: `File with the name ${file.path} already exists`
			}));
			return;
		}
		parent.children[file.path] = file;
	}

	addFolder(folder: PathNode, parent: PathNode, overwriteDuplicate: boolean = false) {
		if (!folder.path || folder.path.length===0){
			this._controlService.exceptionEvent.emit(<Event>({
				type: "NullOrEmptyException",
				level: EventLevel.Warning,
				message: `Folder path is null or empty`
			}));
			return;
		}
		if (parent.children.hasOwnProperty(folder.path) && !overwriteDuplicate) {
			this._controlService.exceptionEvent.emit(<Event>({
				type: "FolderExists",
				level: EventLevel.Warning,
				message: `Folder with the name ${folder.path} already exists`
			}));
			return;			
		}
		parent.children[folder.path] = folder;
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