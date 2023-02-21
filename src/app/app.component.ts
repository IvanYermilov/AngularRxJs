import { Component} from '@angular/core';
 
 
@Component({
    selector: 'my-app',
    template: `<div>
                    <nav>
                        <a routerLink="first-component">First component</a>
                        <a routerLink="second-component">Second component</a>
                        <a routerLink="third-component">Third component</a>
                    </nav>
                    <router-outlet></router-outlet>
               </div>`,
    styles: ['a + a { margin-left: 10px;}']
})
export class AppComponent { 
}