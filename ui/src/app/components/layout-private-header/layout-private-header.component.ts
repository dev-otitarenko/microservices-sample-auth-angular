import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MenuItem} from "primeng/api";
import {AuthService} from "../../_services/auth.service";
import {ConfigService} from "../../_services/config.service";
import {AppMessagesService} from "../../_services/app-messages.service";

@Component({
  selector: 'app-layoutPrivateHeader',
  templateUrl: './layout-private-header.component.html',
  styleUrls: ['./layout-private-header.component.css']
})
export class LayoutPrivateHeaderComponent implements OnInit {
  @Output() toggleMenubar: EventEmitter<any> = new EventEmitter();

  showDialogChangePsw: boolean = false;
  showDialogUpdateRec: boolean = false;
  authItems: MenuItem[] = [
    { label: 'Update your info', icon: 'pi pi-pencil', command: () => { this.getAuthRec(); }},
    { label: 'Change your password', icon: 'pi pi-refresh', command: () => { this.showDialogChangePsw = true; }}
  ];

  constructor(private _authService: AuthService,
              private _configService: ConfigService) { }

  ngOnInit() {
  }

  onMenuButtonClick(event: Event) {
    event.preventDefault();
    this.toggleMenu();
  }

  logout() {
    this._authService.logout();
  }

  toggleMenu() {
    this.toggleMenubar.emit();
  }

  private getAuthRec() {
  }

  get authService(): AuthService {
    return this._authService;
  }
}
