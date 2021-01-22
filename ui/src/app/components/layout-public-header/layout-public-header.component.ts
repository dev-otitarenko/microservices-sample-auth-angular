import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {ConfigService} from "../../_services/config.service";

@Component({
  selector: 'app-layoutPublicHeader',
  templateUrl: './layout-public-header.component.html',
  styleUrls: ['./layout-public-header.component.css']
})
export class LayoutPublicHeaderComponent implements OnInit, OnDestroy {
  routeActive: string = "";
  subscriptionRoute: Subscription;

  constructor(private _configService: ConfigService,
              private router: Router) {
  }

  ngOnInit() {
    let _self = this;
    this.subscriptionRoute = this.router.events.subscribe(function (s) {
      if (s instanceof NavigationEnd) {
        _self.routeActive = s.urlAfterRedirects;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionRoute.unsubscribe();
  }

  login() {
    this.router.navigate(['/login']);
  }
}
