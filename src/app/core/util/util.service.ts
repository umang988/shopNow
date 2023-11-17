import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public showSidebar : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public selectedForType : BehaviorSubject<string>;
  public showLoader : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private activatedRoute : ActivatedRoute) {
    let gender = this.activatedRoute.snapshot.paramMap.get('gender');
    this.selectedForType = new BehaviorSubject(gender);
   }
}
