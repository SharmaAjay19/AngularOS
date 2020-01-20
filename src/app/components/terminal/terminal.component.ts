import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonDataService } from '../../services/commonData.service';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  currentDir: string = "root/home/__user__/desktop";
  logs: TerminalCommand[] = [];
  commandString: string = "";
  @ViewChild("LiveCommand") liveCommandDiv: ElementRef;
  constructor(public commonDataService: CommonDataService,
              public commandService: CommandService
    ) { }

  ngOnInit() {
    this.liveCommandDiv.nativeElement.focus();
  }

  execute(){
    var cmdStr = this.commandString.valueOf();
    this.logs.push(<TerminalCommand>({cmdStr: cmdStr, cmdOut: this.runCommand(cmdStr), cmdDir: this.currentDir.valueOf()}));
    this.commandString = "";
    this.liveCommandDiv.nativeElement.focus();
  }

  runCommand(cmdStr): string{
    switch (cmdStr){
      case "":
        return "";
      case "ls":
        return this.commandService.listCurrentDir(this.currentDir.valueOf());
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