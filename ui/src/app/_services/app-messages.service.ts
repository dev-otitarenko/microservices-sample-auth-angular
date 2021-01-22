import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ApiError} from "../_utils/ui-utils";

@Injectable({
  providedIn: 'root'
})
export class AppMessagesService {
  notificationMessages: Subject<Object> = new Subject<Object>();

  constructor() { }

  showError(msg: string, title?: string) {
    this.notificationMessages.next({severity: 'error', summary: title || 'Sorry, an error occurred', detail: msg, life: 10000});
  }

  showSuccess(msg: string, title?: string) {
    this.notificationMessages.next({severity: 'success', detail: msg, summary: title || 'Success message' });
  }

  showInfo(msg: string, title?: string) {
    this.notificationMessages.next({severity: 'info', detail: msg, summary: title || 'Info message' });
  }

  showWarn(msg: string, title?: string) {
    this.notificationMessages.next({severity: 'warn', detail: msg, summary: title || 'Warn message', life: 10000 });
  }

  showMessage(error:any, title?:string) {
    if (error.status == 400 || // Bad Request
      error.status == 403 || // Forbidden
      error.status == 404) {// /NotFound
      let apiError: ApiError = error.error;
      let _message: string = "<b>Status:</b> [" + error.status + "] " + error.statusText + " " + error.url + "<br /><b>Message:</b> " + apiError.message;
      let _errors = apiError.errors;
      if (_errors) {
        _message += "<br /><b>Detail:</b><ul>";
        for(let _k in _errors) {
          _message += "<li>" + _errors[_k] + "</li>";
        }
        _message += "</ul>";
      }

      if (apiError.status === "error") {
        this.showError(_message, title);
      } else {
        this.showWarn(_message, title);
      }
    } else {
      try {
        let _message: string = "<b>Status:</b> [" + error.status + "] " + error.statusText + " " + error.url + "<br /><b>Message:</b> " + error.message;
        if (error.error) {
          if (error.error.exception) _message += "<br /><b>Exception: </b>" + error.error.exception;
          if (error.error.message) _message += "<br /><b>Detail message: </b>" + error.error.message;
          let _errors = error.error.errors;
          if (_errors) {
            _message += "<br /><b>Detail info:</b><ul>";
            for(let _k in _errors) {
              _message += "<li>" + _errors[_k] + "</li>";
            }
            _message += "</ul>";
          }
        }
        this.showError(_message, title);
      } catch(_) {
        this.showError(error, title);
      }
    }
  }
}
