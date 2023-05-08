import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  workdesc: string;
  no: number;
  Qty: number;
  StartDate : string;
  EndDate:string,
  UOM:string
  Cost:number
  Action:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {no: 1, workdesc:'fasdfasdfasd',
    
    Qty:5,
    StartDate :'22/02/2023',
    EndDate:'22/02/2025',
    UOM:'',
    Cost:100000,
    Action:''},

];
@Component({
  selector: 'app-project-header-details',
  templateUrl: './project-header-details.component.html',
  styleUrls: ['./project-header-details.component.scss']
})
export class ProjectHeaderDetailsComponent implements OnInit {
  displayedColumns: string[] = ['no', 'workdesc', 'Qty', 'StartDate','EndDate','UOM','Cost','Action'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
