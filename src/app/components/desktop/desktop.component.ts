import { Component, ViewChild } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';
import { v4 as uuid } from 'uuid';

declare var $ : any;
@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent {
  showContextMenu: boolean = false;

  public constructor(private commonDataService: CommonDataService){
  	this.commonDataService.contextMenuSelectEvent.subscribe(res => {
  		this.hideContextMenu();
  	});

  	this.commonDataService.currentPathChangedEvent.subscribe(res => {
  		this.commonDataService.currentPathFiles = this.commonDataService.userData["file_system"].filter(file => file.path === this.commonDataService.currentPath);
  	});
  }


  ngOnInit(){
	$(function() {

		setInterval(function() {
			var time = new Date(),
				hours = time.getHours(),
				minutes = time.getMinutes();

			if (minutes < 10 ) {
				minutes = 0 + minutes;
			}

			if (hours >= 12) {
				hours = hours - 12;
				$('.nav .right .am-pm').text('PM');
			}

			else {
				$('.nav .right .am-pm').text('AM');
			}


			$('.nav .right .time').text(hours + ':' + minutes);

		},1000);

		var height = $(window).height() - $('.nav').height();
		$('.launcher').height(height);


		$('.desktop').height(height);
		$('.desktop-overlay').hide();

		$('.launcher button').click(function() {
			$('.desktop-overlay').fadeToggle('200');
			$('.launcher i').toggleClass('opacity');
		});
	    
  	});
  	var self = this;
  	if (document.addEventListener) { // IE >= 9; other browsers
        document.addEventListener('contextmenu', function(e) {
            self.showContextMenu = true;
            var menu = document.getElementById("contextMenu");
            console.log(menu);
            console.log(e.pageX + "-" + e.pageY);
            if (menu){
            	menu.setAttribute("style", "top: " + e.pageY + "px; left: " + e.pageX + "px;");
            }
            e.preventDefault();
        }, false);
    }
  }

  hideContextMenu(){
  	this.showContextMenu = false;
  }
}