import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { ControlComponent } from './components/control/control.component';
import { VideoComponent } from './components/video/video.component';
import { SubtitlesListComponent } from './components/subtitles-list/subtitles-list.component';
import { ItemSubtitlesListComponent } from './components/item-subtitles-list/item-subtitles-list.component';
import { VideoSubtitleComponent } from './components/video-subtitle/video-subtitle.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    PlayerComponent,
    ControlComponent,
    VideoComponent,
    SubtitlesListComponent,
    ItemSubtitlesListComponent,
    VideoSubtitleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }