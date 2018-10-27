import { Component, ViewChild } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';
import { v4 as uuid } from 'uuid';

declare var $ : any;
@Component({
  selector: 'app-context-menu',
  templateUrl: './contextMenu.component.html',
  styleUrls: ['./contextMenu.component.css']
})
export class ContextMenuComponent {
	menuItems: any[] = [];
	public constructor(public commonDataService: CommonDataService){}

	ngOnInit(){
		this.menuItems = [
			{
				title: "Cut",
				action: "cut"
			},
			{
				title: "Copy",
				action: "copy"
			},
			{
				title: "Open",
				action: "open"
			},
			{
				title: "New File",
				action: "new"
			}
		];
	}

	menuItemClick(item){
		this.commonDataService.contextMenuSelectEvent.emit(item);
		if (item.action==="new"){
			this.commonDataService.userData["file_system"]["files"].push({
						"fileid": uuid(),
						"filename": "New File.txt",
						"path": this.commonDataService.currentPath,
						"contents": ""
					});
			this.commonDataService.refreshCurrentPathFiles();
		}
	}
}