import { Component, Input, OnChanges } from '@angular/core';
import { createProjectComponent } from 'src/app/models/create-project-component.model';

@Component({
  selector: 'app-project-component-elements',
  templateUrl: './project-component-elements.component.html',
  styleUrls: ['./project-component-elements.component.scss']
})
export class ProjectComponentElementsComponent implements OnChanges {

  public dataSource: createProjectComponent[];

  public columnToDispaly: string[] = ['sorno', 'workdetail', 'quantity', 'uom', 'rate', 'amount', 'geolocation', 'startdate', 'enddate', 'materialreq', 'remainingbuget', 'carryforwardamt', 'totalamount']

  @Input() componentElementDetails: createProjectComponent[];

  constructor() { }

  ngOnChanges() {
    if (this.componentElementDetails) {
      this.dataSource = this.componentElementDetails;
    }
  }

}
