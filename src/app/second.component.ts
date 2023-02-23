import { Component} from '@angular/core';
import { CancellationService } from './cancel.service';
import { interval, take, switchMap, mergeMap, mergeAll, of, repeat, delay, iif, takeWhile } from 'rxjs';

const numbers = interval(1000).pipe(take(20));
  
@Component({
    selector: 'second-comp',
    template: `<h3>The second component</h3>
    <button (click) = "firstTask()">Repeat</button>
    <button (click) = "secondTask()">New stream</button>
    <button (click) = "thirdTask()">Each 4th repeat</button>
    <button (click) = "forthTask()">Independent value repeat</button>`,
    styles: ['button + button { margin-left: 10px;}']
})

export class SecondComponent {
    constructor(private CancellationService: CancellationService){}

    firstTask(){
        this.CancellationService.run();

        const repeatedValue = numbers.pipe(
            switchMap(val => of(val).pipe(delay(200),repeat(10))
        ));
        
        repeatedValue.pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(`value:${val}`));

    }

    secondTask(){
        this.CancellationService.run();

        const newStreams = numbers.pipe(
            mergeMap(() => interval(100).pipe(take(10)))
        );
        
        newStreams.pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(`value:${val}`));

    }

    thirdTask(){
        this.CancellationService.run();

        const forthRepeat = numbers.pipe(mergeMap(val => iif(() => val % 4 === 0, of(val).pipe(delay(400), repeat(5)), "" )))
        
        forthRepeat.pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(`value:${val}`));
    }

    forthTask(){
        this.CancellationService.run();

        const mergedValues = numbers.pipe(val => of(val).pipe(delay(300),repeat(5)), mergeAll())
        
        mergedValues.pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(`value:${val}`));
    }
}
