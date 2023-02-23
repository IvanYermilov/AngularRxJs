import { Component} from '@angular/core';
import { interval, map, take, tap, filter, takeWhile } from 'rxjs';
import { CancellationService } from './cancel.service';

const numbers = interval(500).pipe(take(20));
  
@Component({
    selector: 'first-comp',
    template: `<h3>The first component</h3>
    <button (click) = "firstTask()">Multiply by 3</button>
    <button (click) = "secondTask()">Take 7</button>
    <button (click) = "thirdTask()">Even values</button>`,
    styles: ['button + button { margin-left: 10px;}']
})

export class FirstComponent {
    constructor(private CancellationService: CancellationService){}

    firstTask(){
        this.CancellationService.run();

        const multipliedValues = numbers.pipe(
            tap(val => console.log(`Initial value:${val}`)),
            map(val => val * 3)
        );
        
        multipliedValues.pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(`Multiplied value:${val}`));
    }

    secondTask(){
        this.CancellationService.run();

        const firstSevenValues = numbers.pipe(take(7));
        
        firstSevenValues.pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(`Value:${val}`));
    }

    thirdTask(){
        this.CancellationService.run();

        const evenValues = numbers.pipe(
            filter(val => val % 2 === 0)
        );
        
        evenValues.pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(`Even value:${val}`));
    }
}