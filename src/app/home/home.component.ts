import { Component, OnInit } from '@angular/core';
import { Global } from '../core/constants/globalConstants';
import { UtilService } from '../core/util/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public shopFor : any[] = Global.FOR_TYPES;

  constructor(private utilService : UtilService){}
  
  ngOnInit(): void {
    
  }

  onTypeSelect(type) {
    this.utilService.selectedForType.next(type);
  }
}
