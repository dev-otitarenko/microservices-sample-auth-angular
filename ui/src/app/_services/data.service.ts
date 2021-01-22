import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient,
              private configService: ConfigService) { }

  callService1() {
    return this.http.get<any>(`${this.configService.api.svc1}`);
  }

  callService2() {
    return this.http.get<any>(`${this.configService.api.svc2}`);
  }
}
