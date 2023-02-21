import { Component} from '@angular/core';
import { interval, take, switchMap, mergeMap, mergeAll, of, repeat, delay, iif } from 'rxjs';

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
    firstTask(){
        const repeatedValue = numbers.pipe(
            switchMap(val => of(val).pipe(delay(200),repeat(10))
        ));
        
        repeatedValue.subscribe(val => console.log(`value:${val}`));

    }

    secondTask(){
        const newStreams = numbers.pipe(
            mergeMap(() => interval(100).pipe(take(10)))
        );
        
        newStreams.subscribe(val => console.log(`value:${val}`));

    }

    thirdTask(){
        const forthRepeat = numbers.pipe(mergeMap(val => iif(() => val % 4 === 0, of(val).pipe(delay(400), repeat(5)), "" )))
        
        forthRepeat.subscribe(val => console.log(`value:${val}`));
    }

    forthTask(){
        const mergedValues = numbers.pipe(val => of(val).pipe(delay(300),repeat(5)), mergeAll())
        
        mergedValues.subscribe(val => console.log(`value:${val}`));
    }
}
