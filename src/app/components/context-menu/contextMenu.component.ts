import { Component, ViewChild } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';

declare var $ : any;
@Component({
  selector: 'app-context-menu',
  templateUrl: './contextMenu.component.html',
  styleUrls: ['./contextMenu.component.css']
})
export class ContextMenuComponent {
	menuItems: any[] = [];
	public constructor(private commonDataService: CommonDataService){}

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
	}
}