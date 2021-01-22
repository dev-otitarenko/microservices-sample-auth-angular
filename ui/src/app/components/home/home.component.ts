import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppMessagesService} from "../../_services/app-messages.service";
import {AuthService} from "../../_services/auth.service";
import {DataService} from "../../_services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message1: string = "?";
  public message2: string = "?";

  constructor(private dataService: DataService,
              private authService: AuthService,
              private messageService: AppMessagesService,
              private router: Router) {
  }

  ngOnInit() {
    this.dataService.callService1()
      .subscribe(data => {
        this.message1 = data.message;
      },
      error => {
        this.messageService.showMessage(error);
      });

    this.dataService.callService2()
      .subscribe(data => {
          this.message2 = data.message;
        },
        error => {
          this.messageService.showMessage(error);
        });
  }
}
