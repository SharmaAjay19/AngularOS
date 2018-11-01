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
  desktopFiles: any[] = [];
  currentPath: string = "/home/__user__/desktop/";
  public constructor(public commonDataService: CommonDataService){
  	this.commonDataService.contextMenuSelectEvent.subscribe(res => {
  		this.hideContextMenu();
  	});

    this.commonDataService.refreshSystemDataEvent.subscribe(data => {
      this.refreshDesktop();
    });
  }

  openUploader(){
    this.commonDataService.openFileUploaderEvent.emit(true);
  }

  openFileInEditor(fileid){
  	this.commonDataService.openFileInEditorEvent.emit(fileid);
  }

  refreshDesktop(){
    this.desktopFiles = this.commonDataService.userData["file_system"]["files"].filter(file => file.path === this.currentPath);
  }

  ngOnInit(){
  	this.refreshDesktop();    
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
              if (menu){
              	menu.setAttribute("style", "top: " + e.pageY + "px; left: " + e.pageX + "px;");
              }
              e.preventDefault();
          }, false);
      }
      
      setTimeout(() =>
      {
        var classname = document.getElementsByClassName("bringToFront");
        for (var i = 0; i < classname.length; i++) {
          (function(x){
            x.addEventListener('click', function(e){
              var siblings = document.getElementsByClassName("bringToFront");
              for (var j=0; j < siblings.length; j++){
                (siblings[j] as HTMLElement).style.zIndex = "10";
              }
              (x as HTMLElement).style.zIndex = "20";
            }, false);
          })(classname[i]);
        }
      }, 1000);
  }

  hideContextMenu(){
  	this.showContextMenu = false;
  }

  openBrowser(){
    this.commonDataService.openBrowserEvent.emit("");
  }

  downloadUserData(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.commonDataService.userData));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "userData.json");
    dlAnchorElem.click();
  }
}