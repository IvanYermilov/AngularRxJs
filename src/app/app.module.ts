import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';
import { FirstComponent } from './first.component';
import { SecondComponent } from './second.component';
import { ThirdComponent } from './third.component';
import { SubjectComponent} from './subjects.component';

const appRoutes: Routes =[
    { path: 'first-component', component: FirstComponent},
    { path: 'second-component', component: SecondComponent},
    { path: 'third-component', component: ThirdComponent },
    { path: 'subj-comp', component: SubjectComponent }
];

@NgModule({
    imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), FormsModule ],
    declarations: [ AppComponent, FirstComponent, SecondComponent, ThirdComponent, SubjectComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }