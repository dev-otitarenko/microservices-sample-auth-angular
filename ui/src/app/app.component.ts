import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {Keepalive} from "@ng-idle/keepalive";
import {Router} from "@angular/router";
import {HTTPStatus} from "./_services/oauth.http.interceptor";
import {MessageService} from "primeng/api";
import {AuthService} from "./_services/auth.service";
import {ConfigService} from "./_services/config.service";
import {AppMessagesService} from "./_services/app-messages.service";
import {LoaderService} from "./_services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptionMessages: Subscription;
  private subscriptionAuthService: Subscription;

  showMessage: boolean = false;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date | null = null;
  title = 'angular-idle-timeout';
  //
  isMobileResolution = false;

  constructor  (private msgService: MessageService,
                private httpStatus: HTTPStatus,
                private _authService: AuthService,
                private _configService: ConfigService,
                private router: Router,
                private idle: Idle,
                private keepalive: Keepalive,
                private messageService: AppMessagesService,
                private loaderService: LoaderService) {
    // SSubscribe for loadingService
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      if (status) {
        this.loaderService.show();
      } else {
        this.loaderService.hide();
      }
    });

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(60*60);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.showMessage = false;
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.router.navigate(['/']);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      console.log(this.idleState);
      this.showMessage = true;
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
    idle.stop();

    let _self = this;
    this.subscriptionAuthService = this._authService.getAuthData$.subscribe(userLoggidIn => {
      if (userLoggidIn) { // Login
        idle.watch();
        this.timedOut = false;
      } else { // Logout
        idle.stop();
        _self.router.navigate(['/login']);
      }
    });
    this.subscriptionMessages = this.messageService.notificationMessages
      .subscribe(notification => {
        let rec = notification;
        const severity = rec['severity'];
        if (severity === 'error' || severity === 'warn') {
          rec['life'] = 10000;
        }
        this.msgService.add(rec);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptionMessages.unsubscribe();
    this.subscriptionAuthService.unsubscribe();
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.showMessage = false;
    this._authService.logout();
  }

  loggedIn(): boolean {
    return this._authService.loggedIn();
  }

  toggleMenu() {
  }
}
