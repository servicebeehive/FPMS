import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { projectComponentData } from 'src/app/models/project-component-data.model';

@Component({
  selector: 'app-project-component-elements',
  templateUrl: './project-component-elements.component.html',
  styleUrls: ['./project-component-elements.component.scss']
})
export class ProjectComponentElementsComponent implements OnChanges {

  public dataSource: createProjectComponent[];

  public columnToDispaly: string[]

  @Input() componentElementDetails: createProjectComponent[];
  @Input() isParentSummaryDetails: boolean;
  @Output() onClickRowItem = new EventEmitter<Partial<projectComponentData>>();

  constructor() { }

  ngOnChanges() {
    if (this.componentElementDetails) {
      if (this.isParentSummaryDetails) {
        this.columnToDispaly = ['sorno', 'workdetail', 'quantity', 'uom', 'rate', 'amount', 'geolocation', 'startdate', 'enddate', 'materialreq', 'remainingbuget', 'carryforwardamt', 'totalamount']
      }
      else {
        this.columnToDispaly = ['sorno', 'workdetail', 'quantity', 'uom', 'rate', 'amount', 'geolocation', 'startdate', 'enddate', 'materialreq', 'remainingbuget', 'carryforwardamt', 'totalamount', 'actions']
      }
      this.dataSource = this.componentElementDetails;
    }
  }

  onClickEdit(actionType: string, item: createProjectComponent) {
    let data: Partial<projectComponentData> = {
      actionType: actionType,
      componentDetails: item
    };

    this.onClickRowItem.emit(data);
  }

}
