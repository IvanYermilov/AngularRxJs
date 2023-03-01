import { Component} from '@angular/core';
import { interval, map, take, tap, filter, takeWhile } from 'rxjs';
import { CancellationService } from './cancel.service';

const numbers = interval(500).pipe(take(20));
  
@Component({
    selector: 'first-comp',
    templateUrl: './templates/first.component.html',
    styleUrls: ['./styles/button-styles.css']
})

export class FirstComponent {
    constructor(private cancellationService: CancellationService){}

    public firstTask(){
        this.cancellationService.isCancelled.next(false);

        const multipliedValues = numbers.pipe(
            tap(val => console.log(`Initial value:${val}`)),
            map(val => val * 3)
        );
        
        multipliedValues.pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(`Multiplied value:${val}`));
    }

    public secondTask(){
        this.cancellationService.isCancelled.next(false);

        const firstSevenValues = numbers.pipe(take(7));
        
        firstSevenValues.pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(`Value:${val}`));
    }

    public thirdTask(){
        this.cancellationService.isCancelled.next(false);

        const evenValues = numbers.pipe(
            filter(val => val % 2 === 0)
        );
        
        evenValues.pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(`Even value:${val}`));
    }
}