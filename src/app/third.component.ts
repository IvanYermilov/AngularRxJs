import { Component} from '@angular/core';
import { CancellationService } from './cancel.service';
import { interval, take, map, combineLatest, forkJoin, zip, takeWhile } from 'rxjs';

const source1 = interval(200).pipe(take(10),map((val) => 'source1 val = ' + val));
const source2 = interval(300).pipe(take(10),map((val) => 'source2 val = ' + val));
const source3 = interval(400).pipe(take(10),map((val) => 'source3 val = ' + val)); 
  
@Component({
    selector: 'third-comp',
    template: `<h3>The third component</h3>
    <button (click) = "firstTask()">Combine</button>
    <button (click) = "secondTask()">Last values</button>
    <button (click) = "thirdTask()">Wait each latest</button>`,
    styles: ['button + button { margin-left: 10px; }']
})
export class ThirdComponent {
    constructor(private CancellationService: CancellationService){}

    firstTask(){
        this.CancellationService.run();

        combineLatest([source1, source2, source3]).pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(val));
    }

    secondTask(){
        this.CancellationService.run();

        forkJoin([source1, source2, source3]).pipe(takeWhile(() => this.CancellationService.getCancellationStatus())).subscribe(val => console.log(val));
    }

    thirdTask(){
        this.CancellationService.run();

        zip(source1, source2, source3).pipe(takeWhile(() => !this.CancellationService.getCancellationStatus())).subscribe(val => console.log(val));
    }
}