import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Base64} from 'js-base64';
import {LogonUser, OAuthHelper} from "./oauth.helper";
import {Cookie} from "ng2-cookies";
import {ConfigService} from "./config.service";
import {AppMessagesService} from "./app-messages.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subjectAuthService: Subject<boolean> = new Subject<boolean>();
  getAuthData$ = this.subjectAuthService.asObservable();

  constructor(private http: HttpClient,
              private configService: ConfigService,
              private messageService: AppMessagesService) {
  }

  login(username: string, password: string, success: () => any, failure: (resp) => any) {
    const data = `grant_type=password&username=${username}&password=${password}`;
    return this.http.post<any>(this.configService.api.oauth.token, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Base64.encode('adminapp:password')
      }
    })
      .subscribe(
        data => {
          OAuthHelper.tokenObject = data;
          this.subjectAuthService.next(true);

          success();
        },
        error => {
          failure(error);

          if (error.error && error.error.error_description) {
            this.messageService.showError(error.error.error_description);
          } else {
            this.messageService.showMessage(error);
          }
        });
  }

  refreshToken(): Observable<any> {
    const data = `grant_type=refresh_token&refresh_token=${OAuthHelper.tokenObject.refresh_token}`;
    return this.http.post<any>(this.configService.api.oauth.token, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Base64.encode('adminapp:password')
      }
    });
  }

  private userLogout() {
    localStorage.clear();
    console.log(OAuthHelper.isLogin);

    this.subjectAuthService.next(false);
  }

  getAuth(): Observable<any> {
    return this.http.get<any>(`${this.configService.api.account.auth}`);
  }

  loggedIn(): boolean {
    return OAuthHelper.isLogin;
  }

  logout() {
    this.http.get(this.configService.api.oauth.logout)
      .subscribe(ret => {
        this.userLogout();
      })
  }

  get user(): LogonUser {
    if (this.loggedIn()) { return OAuthHelper.tokenObject.user; }
    return new LogonUser();
  }
}
