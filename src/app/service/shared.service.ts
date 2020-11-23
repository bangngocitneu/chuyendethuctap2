import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private messageSource = new BehaviorSubject(1);
  currentMessage =  this.messageSource.asObservable();

  changeMessage(message: number){
    this.messageSource.next(message);
  }
}
