import { Component, ViewChild, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonDataService } from '../../services/commonData.service';
import { v4 as uuid } from 'uuid';
import { PathNode } from '../../models/filesystem';

declare var $ : any;
@Component({
  selector: 'app-audio-player',
  templateUrl: './audioPlayer.component.html',
  styleUrls: ['./audioPlayer.component.css']
})
export class AudioPlayerComponent {

    ESCAPE_KEYCODE = 27;
    music_folder: PathNode;

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (event.keyCode === this.ESCAPE_KEYCODE) {
          //this.showAudioPlayer = false;
        }
    }

    closeWindow(){
      this.stopPlaying();
      this.showAudioPlayer = false;
      this.reset();
    }

    reset(){
      this.urlInput = "";
      this.audioSource = null;
      this.audioFiles = [];
    }

    showAudioPlayer: boolean = false;
    urlInput: string = "";
    audioSource: string = null;
    audioFiles: any[] = [];
    public constructor(public commonDataService: CommonDataService,
                       private _sanitizationService: DomSanitizer){
      this.commonDataService.openAudioPlayerEvent.subscribe(data => {
        if (data){
          this.showAudioPlayer = !this.showAudioPlayer;
          if (this.showAudioPlayer){
            this.refreshAudioFileList();
          }
        }
      });

      this.commonDataService.refreshSystemDataEvent.subscribe(evt => {
        this.closeWindow();
        this.refreshAudioFileList();
      });
    }

    refreshAudioFileList(){
      this.audioFiles = [];
      this.music_folder = this.commonDataService.getOrCreateFolder("root/home/__user__/music");
      for (var obj in this.music_folder.children){
        if (this.music_folder.children[obj].type !== "folder"){
          this.audioFiles.push(this.music_folder.children[obj]);
        }
      }
    }

    sanitizeUrl(url){
      return this._sanitizationService.bypassSecurityTrustResourceUrl(url);
    }

    ngOnInit(){
      this.music_folder = this.commonDataService.getOrCreateFolder("root/home/__user__/music");
    }

    loadUrl(){
      this.audioSource = this.urlInput;
      var audio = document.getElementById('audio') as HTMLAudioElement;
      var source = document.getElementById('audioSource') as HTMLAudioElement;
      source.src = this.urlInput;
      audio.load(); //call this to just preload the audio without playing
      audio.play();
    }

    saveAudio(fileName?: string){
      this.audioSource = this.urlInput;
      var fileid = uuid();
      var newFile = {
        "type": "file",
        "fileid": fileid,
        "filename": fileName && fileName.length>0 ? fileName : "AudioFile",
        "path": fileid,
        "contents": this.audioSource
      };
      this.commonDataService.addFile(newFile, this.music_folder);
      this.refreshAudioFileList();
    }

    playSong(item){
      var audio = document.getElementById('audio') as HTMLAudioElement;
      var source = document.getElementById('audioSource') as HTMLAudioElement;
      source.src = item.contents;
      audio.load(); //call this to just preload the audio without playing
      audio.play();
    }

    stopPlaying(){
      var audio = document.getElementById('audio') as HTMLAudioElement;
      if (!audio.paused)
        audio.pause();
    }
}