import { Component, OnInit} from '@angular/core';
import { AppComponent }   from './app.component';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

const subject = new Subject();

subject.subscribe(val => console.log(`Subject value: ${val}`));

const asyncSubject = new AsyncSubject();

asyncSubject.subscribe(val => console.log(`AsyncSubject value: ${val}`));

const replaySubject = new ReplaySubject();

replaySubject.subscribe(val => console.log(`ReplaySubject value: ${val}`));

const behaviorSubject = new BehaviorSubject(0);

behaviorSubject.subscribe(val => console.log(`BehaviorSubject value: ${val}`));

@Component({
    selector: 'subj-comp',
    templateUrl: './templates/subject.component.html',
    styleUrls: ['./styles/subject.component.css', './styles/button-styles.css']
})

export class SubjectComponent implements OnInit {
    constructor (private appComponent: AppComponent){}

    public subjectValue: number = 0;
    public asyncSubjectValue: number = 0;
    public replaySubjectValue : number = 0;
    public replaySubjectSubscriberNumber: number = 0;
    public behaviorSubjectValue: number = 0;

    subjectNextValue() {
        subject.next(this.subjectValue);
    }
    
    subjectComplete() {
        subject.complete();
        console.log('Subject was completed')
    }

    asyncSubjectNextValue() {
        asyncSubject.next(this.asyncSubjectValue);
    }

    asyncSubjectComplete() {
        asyncSubject.complete();
        console.log('AsyncSubject was completed')
    }

    replaySubjectNextValue() {
        replaySubject.next(this.replaySubjectValue);
    }

    addReplaySubjectSubscriber() {
        let index = this.replaySubjectSubscriberNumber;
        replaySubject.subscribe(val => console.log(`New ReplaySubject subscriber_${index} value: ${val}`));
        this.replaySubjectSubscriberNumber++;
    }

    replaySubjectComplete() {
        replaySubject.complete();
        console.log('ReplaySubject was completed')
    }

    behaviorSubjectNextValue() {
        behaviorSubject.next(this.behaviorSubjectValue);
    }

    behaviorSubjectCurrentValue() {
        console.log(`BehaviorSubject current value: ${behaviorSubject.getValue()}`);
    }

    behaviorSubjectComplete() {
        behaviorSubject.complete();
        console.log('BehaviorSubject was completed')
    }
    
    ngOnInit(): void {
        this.appComponent.showElement = false;
    }
}