import { Component} from '@angular/core';
import { CancellationService } from './cancel.service';
import { interval, take, map, combineLatest, forkJoin, zip, takeWhile } from 'rxjs';

const source1 = interval(200).pipe(take(10),map((val) => 'source1 val = ' + val));
const source2 = interval(300).pipe(take(10),map((val) => 'source2 val = ' + val));
const source3 = interval(400).pipe(take(10),map((val) => 'source3 val = ' + val)); 
  
@Component({
    selector: 'third-comp',
    templateUrl: './templates/third.component.html',
    styleUrls: ['./styles/button-styles.css']
})
export class ThirdComponent {
    constructor(private cancellationService: CancellationService){}

    public firstTask(){
        this.cancellationService.isCancelled.next(false);

        combineLatest([source1, source2, source3]).pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(val));
    }

    public secondTask(){
        this.cancellationService.isCancelled.next(false);

        forkJoin([source1, source2, source3]).pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
            .subscribe(val => console.log(val));
    }

    public thirdTask(){
        this.cancellationService.isCancelled.next(false);

        zip(source1, source2, source3).pipe(takeWhile(() => !this.cancellationService.isCancelled.getValue()))
        .subscribe(val => console.log(val));
    }
}