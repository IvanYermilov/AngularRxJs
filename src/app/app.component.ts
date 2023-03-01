import { Component} from '@angular/core';
import { CancellationService } from './cancel.service';
 
@Component({
    selector: 'my-app',
    templateUrl: './templates/app.component.html',
    styleUrls: ['./styles/app.component.css']
})
export class AppComponent { 
    constructor(private cancellationService: CancellationService){}

    public cancel(){
        this.cancellationService.cancel();
    }
}