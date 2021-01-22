import { Injectable } from '@angular/core';
import {globalConfig} from '../_utils/globals';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // private isMobileResolution = false;

  constructor() {
    // if (window.innerWidth <= 992) {
    //   this.isMobileResolution = true;
    // } else {
    //   this.isMobileResolution = false;
    // }
  }

  get config(): any {
    return globalConfig;
  }

  get api(): any {
    return globalConfig.api;
  }
}
