import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

let routes: Routes = [
  { path: '', redirectTo: 'selfTalk', pathMatch: 'full'},
  { path: 'selfTalk', component: AppComponent },
  { path: 'selfTalk/:id', component: AppComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
