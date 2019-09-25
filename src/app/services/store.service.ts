import {
  Injectable
} from '@angular/core';
import * as Store from 'electron-store'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public store;
  public set: any = {
    timePos: (path, time) => {
      time && this.store.set(`${path}.time`, time)
    },
    audioTrackId: (path, id) => {
      id && this.store.set(`${path}.audioId`, id)
    },
    subtitles: (path, subtitles) => {
      subtitles && this.store.set(`${path}.subtitles`, subtitles)
    },
    subtitlesId: (path,id)=>{
      id && this.store.set(`${path}.subtitlesId`, id)
    },
    extensionData: (data)=>{
      this.store.set(`extensionData`,data)
    }
  }
  public get: any = {
    timePos: (path) => {
      return this.store.get(`${path}.time`)
    },
    audioTrackId: (path) => {
      return this.store.get(`${path}.audioId`)

    },
    subtitles: (path) => {
      return this.store.get(`${path}.subtitles`)
    },
    subtitlesId: (path)=>{
      return this.store.get(`${path}.subtitlesId`)
    },
    extensionData: ()=>{
      const data = this.store.get(`extensionData`);
      if (!data) return {
        languageFrom: 'auto',
        languageTo: 'ru',
        localSentence:[],
        exception: []
      };
      return this.store.get(`extensionData`)
    }
  }

  constructor() {
    this.store = new Store();
  }
  isExist(path) {
    return this.store.has(path)
  }
}