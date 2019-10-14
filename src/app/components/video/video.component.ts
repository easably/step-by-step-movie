import {
  Component,
  OnInit,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import {
  MpvService
} from '../../services/mpv.service'
import {
  SubtitlesService
} from '../../services/subtitles.service';
import Subtitle from '../../interfaces/subtitle'
import {VideoSubtitleComponent} from '../video-subtitle/video-subtitle.component'


import {video} from '../../../../../extension'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @ViewChild('embed',undefined) embed : ElementRef;
  @ViewChild(VideoSubtitleComponent,undefined) videoSubtitleComponent;
  @Input() contextMenuEvent;
  public embedProps: any;

  constructor(public mpvService: MpvService, private subtitlesService: SubtitlesService) {
    this.embedProps = this.mpvService.mpv.getDefProps();
    
  }
  ngOnInit() {
    const element = this.embed.nativeElement;
    this.mpvService.mpv.setPluginNode(element);
}
ngAfterViewInit(){
    this.injectExtension();
  }
  injectExtension(){
    const playerParameters = {
      videoDOM: this.embed.nativeElement,
      subtitlesDOM: this.videoSubtitleComponent.subtitleDOM.nativeElement,
      pause: ()=>this.mpvService.setPause(true),
      play: ()=>this.mpvService.setPause(false),
      paused: ()=> this.mpvService.state.pause,
      playRepeat: this.subtitlesService.setSubtitleRepeat.bind(this.subtitlesService),
      playPrev: this.subtitlesService.setSubtitlePrev.bind(this.subtitlesService),
      playNext: this.subtitlesService.setSubtitleNext.bind(this.subtitlesService),
    }
    
    video(playerParameters);
  }
  loopBorderControl(){
    const loopSubtitles: Subtitle[] = this.subtitlesService.getLoopSubtitles();
    const curTime = this.mpvService.state['time-pos'];
    if (loopSubtitles && loopSubtitles.length > 0) {
      const [firstLoopSubtitle, lastLoopSubtitle] = [loopSubtitles[0], loopSubtitles[loopSubtitles.length - 1]]
      if (curTime < firstLoopSubtitle.time) {
        this.mpvService.setTimePos(lastLoopSubtitle.time)
      } else if (curTime >= lastLoopSubtitle.time + lastLoopSubtitle.duration) {
        this.mpvService.setTimePos(firstLoopSubtitle.time)
      }
    }
  }
  setDocumentTitle(){
    const duration = this.mpvService.state.duration;
    const filename = this.mpvService.state.filename;
    if (duration && document.title !== filename){
      document.title = filename;
    }else if (!duration && document.title !== ''){
      document.title = '';
    }
  }
  ngDoCheck() {
    this.setDocumentTitle();
    // this.embed.nativeElement.focus()
    this.subtitlesService.findCurrentSubtitle();
    this.loopBorderControl();
  }
}