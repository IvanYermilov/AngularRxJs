import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent }   from './app.component';
import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';
import { ThirdComponent } from './third.component';

const appRoutes: Routes =[
    { path: 'first-component', component: FirstComponent},
    { path: 'second-component', component: SecondComponent},
    { path: 'third-component', component: ThirdComponent }
];

@NgModule({
    imports:      [ BrowserModule, RouterModule.forRoot(appRoutes) ],
    declarations: [ AppComponent, FirstComponent, SecondComponent, ThirdComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }