import { Component} from '@angular/core';
import { interval, map, take, tap, filter } from 'rxjs';

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
    firstTask(){
        const multipliedValues = numbers.pipe(
            tap(val => console.log(`Initial value:${val}`)),
            map(val => val * 3)
        );
        
        multipliedValues.subscribe(val => console.log(`Multiplied value:${val}`));

    }

    secondTask(){
        const firstSevenValues = numbers.pipe(take(7));
        
        firstSevenValues.subscribe(val => console.log(`Value:${val}`));
    }

    thirdTask(){
        const evenValues = numbers.pipe(
            filter(val => val % 2 === 0)
        );
        
        evenValues.subscribe(val => console.log(`Even value:${val}`));
    }
}