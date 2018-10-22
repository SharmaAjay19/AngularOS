import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CommonDataService {
	public userProfile: any;
	public currentPath: string = "/home/__user__/desktop/";
	public currentPathChangedEvent: EventEmitter<any> = new EventEmitter();
	public currentPathFiles: any[] = [];
	public userData: any = {};
	public contextMenuSelectEvent: EventEmitter<any> = new EventEmitter();
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