import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CancellationService {
    public isCancelled = new BehaviorSubject<boolean>(false);

    public cancel(){
      this.isCancelled.next(true);
    }

  constructor() { }
}