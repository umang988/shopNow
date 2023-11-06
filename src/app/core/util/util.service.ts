import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public showSidebar : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public selectedForType : BehaviorSubject<string> = new BehaviorSubject(null);

  constructor() { }
}
