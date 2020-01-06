import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  currentDir: string = "/home/__user__/desktop/";
  logs: TerminalCommand[] = [];
  commandString: string = "";
  constructor(public commonDataService: CommonDataService) { }

  ngOnInit() {
  }

  execute(){
    var cmdStr = this.commandString.valueOf();
    this.logs.push(<TerminalCommand>({cmdStr: cmdStr, cmdOut: this.runCommand(cmdStr), cmdDir: this.currentDir.valueOf()}));
    this.commandString = "";
  }

  listCurrentDir(): string{
    if (this.currentDir && this.currentDir.length>0){
      return this.commonDataService.userData.files.filter(file => file.path === this.currentDir).map(x => x.filename).join("\n");
    }
    return "";
  }

  runCommand(cmdStr): string{
    switch (cmdStr){
      case "":
        return "";
      case "ls":
        return this.listCurrentDir();
      default:
        return `Command ${cmdStr} not found`;
    }
  }

}

interface TerminalCommand{
  cmdDir: string;
  cmdStr: string;
  cmdOut: string;
}