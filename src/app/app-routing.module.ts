import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

// let routes: Routes = [
//   { path: '', redirectTo: '/selfTalk', pathMatch: 'full'},
//   { path: 'selfTalk', component: AppComponent },
//   { path: 'selfTalk/:id', component: AppComponent },
// ];

let routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: ':id', component: AppComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes,{ enableTracing: false}),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
