import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {throwError as observableThrowError, Observable, BehaviorSubject, EMPTY} from 'rxjs';
import {OAuthHelper, OAuthToken} from './oauth.helper';
import {catchError, filter, finalize, map, switchMap, take} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {ConfigService} from "./config.service";

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject<boolean>(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class OAuthHttpInterceptor implements HttpInterceptor {
  private tokenRefreshing = false;
  private tokenSubject: BehaviorSubject<OAuthToken> = new BehaviorSubject<OAuthToken>(OAuthHelper.tokenObject);

  constructor(private authService: AuthService,
              private status: HTTPStatus,
              private configService: ConfigService) {
  }

  private addAccessToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: 'Bearer ' + OAuthHelper.tokenObject.access_token}});
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(this.configService.api.oauth.token)) {
      this.status.setHttpStatus(true);
      return next.handle(request).pipe(
        map(event => {
          return event;
        }),
        catchError(err => {
          return observableThrowError(err);
        }),
        finalize(() => {
          this.status.setHttpStatus(false);
        })
      );
    }
    this.status.setHttpStatus(true);
    return next.handle(this.addAccessToken(request))
      .pipe(
        map(event => {
          return event;
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>err).status) {
              case 400:
                try {
                  if (err.error.error === 'invalid_grant') {
                    this.authService.logout();
                    return EMPTY;
                  }
                } catch (e) {
                  return observableThrowError(e);
                }
                return observableThrowError(err);
              case 401:
                return this.processRefreshAccessToken(request, next);
              default:
                return observableThrowError(err);
            }
          }
          return observableThrowError(err);
        }),
        finalize(() => {
          this.status.setHttpStatus(false);
        })
      );
  }

  private processRefreshAccessToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.tokenRefreshing) {
      this.tokenRefreshing = true;
      return this.authService.refreshToken()
        .pipe(
          switchMap(token => {
            OAuthHelper.tokenObject = token;
            this.tokenSubject.next(token);
            return next.handle(this.addAccessToken(request));
          }),
          catchError((err: any, caught: Observable<any>) => {
             if (err instanceof HttpErrorResponse) {
               const error = <HttpErrorResponse>err;
               if ((error.status === 400 && err.error.error === 'invalid_grant') || error.status === 401) {
                 this.authService.logout();
                 return EMPTY;
               } else {
                 return observableThrowError(err);
               }
             } else {
                return observableThrowError(err);
             }
          }),
          finalize(() => {
            this.tokenRefreshing = false;
          }));
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null)
        ,take(1)
        ,switchMap(token => {
          OAuthHelper.tokenObject = token;
          return next.handle(this.addAccessToken(request));
        }));
    }
  }
}
