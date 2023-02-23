import { Component} from '@angular/core';
import { CancellationService } from './cancel.service';
 
@Component({
    selector: 'my-app',
    template: `<div>
                    <nav>
                        <a routerLink="first-component">First component</a>
                        <a routerLink="second-component">Second component</a>
                        <a routerLink="third-component">Third component</a>
                    </nav>
                    <router-outlet></router-outlet>
               </div>
               <div class="cancel-button"><button (click) = "cancel()">Cancel</button></div>`,
    styles: ['a + a { margin-left: 10px;} .cancel-button { margin-top: 10px }']
})
export class AppComponent { 
    constructor(private CancellationService: CancellationService){}

    cancel(){
        this.CancellationService.cancel();
    }
}