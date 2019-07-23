import { Component, OnInit, Input } from '@angular/core';
import { File } from '../../models/filesystem';
import {CommonDataService} from '../../services/commonData.service';

declare var $ : any;
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input() file: File;
  constructor(public commonDataService: CommonDataService) { }

  ngOnInit() {
    var self = this;
      $('.contextmenu-clickable').on('contextmenu', function(e){
        self.commonDataService.showContextMenu = true;
        var menu = document.getElementById("contextMenu");
        if (menu){
          menu.setAttribute("style", "top: " + e.pageY + "px; left: " + e.pageX + "px;");
        }
        e.preventDefault();
      });

      $('.selectable').on('click', function(){
        $(this).css("background", "cyan");
      });
  }

}
