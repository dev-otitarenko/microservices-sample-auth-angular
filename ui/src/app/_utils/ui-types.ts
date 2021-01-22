export class Organization {
  id: string; // ID organization
  name: string; // Organization name
}
export class User {
  id: string;
  username: number;
  accountLocked: boolean;
  organization: Organization;
  psw: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  typeAdmin: number;

  constructor() {
    this.organization = new Organization();
  }
}
