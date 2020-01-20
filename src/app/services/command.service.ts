import { Injectable } from '@angular/core';
import { CommonDataService } from './commonData.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(public commonDataService: CommonDataService) { }
  listCurrentDir(currentDir): string{
    var currentPathNode = this.commonDataService.getPathNodeFromPath(currentDir);
    return Object.keys(currentPathNode.children).join("\n");
  }
}
