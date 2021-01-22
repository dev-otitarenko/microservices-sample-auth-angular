import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./_services/auth.guard";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'start', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: HomeComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
