import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CancellationService {
    private isCancelled:boolean = false;

    getCancellationStatus(){
      return this.isCancelled;
    }

    public cancel(){
        this.isCancelled = true;
    }

    public run(){
      this.isCancelled = false;
  }

  constructor() { }
}