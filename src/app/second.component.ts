import { Component} from '@angular/core';
import { CancellationService } from './cancel.service';
import { interval, take, switchMap, mergeMap, concatMap, of, repeat, delay, takeWhile, filter, exhaustMap } from 'rxjs';

const numbers = interval(1000).pipe(take(20));
  
@Component({
    selector: 'second-comp',
    templateUrl: './templates/second.component.html',
    styleUrls: ['./styles/button-styles.css']
})

export class SecondComponent {
    constructor(private cancellationService: CancellationService){}

    public firstTask(){
        this.cancellationService.isCancelled.next(false);

        const repeatedValue = numbers.pipe(
            switchMap(val => of(val).pipe(delay(200),repeat(10))
        ));
        
        repeatedValue.pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(`value:${val}`));

    }

    public secondTask(){
        this.cancellationService.isCancelled.next(false);

        const newStreams = numbers.pipe(
            concatMap(() => interval(100).pipe(take(10)))
        );
        
        newStreams.pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(`value:${val}`));

    }

    public thirdTask(){
        this.cancellationService.isCancelled.next(false);

        const eachForth = numbers.pipe(filter(val => val % 4 === 0))

        const forthRepeat = eachForth.pipe(exhaustMap(val => of(val).pipe(delay(400), repeat(5))))
        
        forthRepeat.pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(`value:${val}`));
    }

    public forthTask(){
        this.cancellationService.isCancelled.next(false);

        const mergedValues = numbers.pipe(mergeMap(val => of(val).pipe(delay(300),repeat(5))));
        
        mergedValues.pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(`value:${val}`));
    }
}
