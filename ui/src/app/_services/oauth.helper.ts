import {Injectable} from '@angular/core';
import {Cookie} from "ng2-cookies";

/** Connected user organization */
export class LogonUserOrganization {
  id: string; // ID organization
  name: string; // Organization name
}

/** Connected user */
export class LogonUser {
  id: string; // User ID
  username: number; // User name

  organization: LogonUserOrganization;

  constructor() {
    this.organization = new LogonUserOrganization();
  }
}

/** Token */
export class OAuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  user: LogonUser;
}

@Injectable()
export class OAuthHelper {
  private static TOKEN_NAME = 'OAUTH_TOKEN';
  private static TOKEN_VAL = "OAUTH_VAL";

  static get tokenObject(): OAuthToken {
    const token: OAuthToken = <OAuthToken>JSON.parse(<string>localStorage.getItem(OAuthHelper.TOKEN_NAME));
    return token || new OAuthToken();
  }

  static set tokenObject(token: OAuthToken) {
    if (token == null) {
      localStorage.removeItem(OAuthHelper.TOKEN_NAME);
    } else {
      localStorage.setItem(OAuthHelper.TOKEN_VAL, token.user.id);
      localStorage.setItem(OAuthHelper.TOKEN_NAME, JSON.stringify(token));
    }
  }

  static get isLogin(): boolean {
    const token: OAuthToken = <OAuthToken>JSON.parse(<string>localStorage.getItem(OAuthHelper.TOKEN_NAME)) || new OAuthToken();
    return token.token_type != null;
  }
}
