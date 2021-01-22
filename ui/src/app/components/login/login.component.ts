import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  sending: boolean = false;

  userform: FormGroup = this.fb.group({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.logout();
    this.userform.reset({ emitEvent: false })
  }

  login(value: any) {
    this.sending = true;
    let success = (): void => {
      this.sending = false;
      this.router.navigate([ '/start' ]);
     };
    const failure = (): void => {
      this.sending = false;
    };
    this.authService.login(value.username, value.password, success, failure);
  }
}
