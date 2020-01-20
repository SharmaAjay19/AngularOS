import { Component, ViewChild } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';
import { WindowData, WindowRendering } from '../../models/windowRendering';
import { PathNode } from '../../models/filesystem';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

declare var $ : any;
@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent {
  desktopFiles: any[] = [];
  desktopNode: PathNode = null;
  timeout: any;
  currentPath: string = "root/home/__user__/desktop";
  public constructor(public commonDataService: CommonDataService){
  	this.commonDataService.contextMenuSelectEvent.subscribe(res => {
      if (res.action == "new"){
        this.refreshDesktop();
      }
  		this.hideContextMenu();
  	});

    this.commonDataService.refreshSystemDataEvent.subscribe(data => {
      this.refreshDesktop();
    });
  }

  openUploader(){
    this.commonDataService.openFileUploaderEvent.emit(true);
  }

  openFileInEditor(file){
  	this.commonDataService.openFileInEditorEvent.emit(file);
  }

  refreshDesktop(){
    if (this.timeout){
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(()=> {
      this.desktopNode = this.commonDataService.getPathNodeFromPath(this.currentPath);
      this.desktopFiles = Object.keys(this.desktopNode.children).map(key => this.desktopNode.children[key]);
    }, 100);
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
      $('.contextmenu-clickable').on('contextmenu', function(e){
        self.commonDataService.showContextMenu = true;
        var menu = document.getElementById("contextMenu");
        if (menu){
          menu.setAttribute("style", "top: " + e.pageY + "px; left: " + e.pageX + "px;");
        }
        e.preventDefault();
      });      
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

      this.openTerminal();
  }

  hideContextMenu(){
  	this.commonDataService.showContextMenu = false;
  }

  openBrowser(){
    this.commonDataService.openBrowserEvent.emit("");
  }

  openTerminal(){
    this.commonDataService.windows.push(
      <WindowData>{
        windowProperties: {
          type: WindowRendering.Terminal
        }
      }
    );
  }

  downloadUserData(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.commonDataService.userData));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "userData.json");
    dlAnchorElem.click();
  }
}