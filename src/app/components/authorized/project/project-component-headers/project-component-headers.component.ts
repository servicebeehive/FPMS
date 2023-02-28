import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { projectComponentData } from 'src/app/models/project-component-data.model';
import { componentDetails } from 'src/app/models/project-component-details.model';
import { CreateComponentsComponent } from '../dialogs/create-components/create-components.component';

@Component({
  selector: 'app-project-component-headers',
  templateUrl: './project-component-headers.component.html',
  styleUrls: ['./project-component-headers.component.scss']
})
export class ProjectComponentHeadersComponent implements OnChanges {

  @Input() projectComponentData: componentDetails[];
  @Input() planYearWiseAmount: budgetYearDetails;

  @Output() public getProjectComponent = new EventEmitter<boolean>();

  public columnToDispaly: string[] = ['sorno', 'workdetail', 'startdate', 'enddate', 'action'];

  public dataSource: componentDetails[];
  public columnsToDisplayWithExpand: string[];
  public actionTypes = ActionTypes;

  constructor(public dialog: MatDialog) { }

  ngOnChanges(): void {
    this.projectComponentData.map(element => {
      element.componentheader = { ...element.componentheader, isExpand: true }
    });
    this.dataSource = this.projectComponentData;
    this.columnsToDisplayWithExpand = [...this.columnToDispaly, 'expand'];
  }

  onClickExpand(element: createProjectComponent) {
    element.isExpand = !element.isExpand
  }

  onClickEdit(actionType: string, item: createProjectComponent) {
    let componentId: number;
    componentId = item.componentid;
    switch (actionType) {
      case (this.actionTypes.edit):
        break;
      case (this.actionTypes.insert):
        break;
      case (this.actionTypes.delete):
        break;
    }
    const dialogRef = this.dialog.open(CreateComponentsComponent, {
      data: { planYearAmount: this.planYearWiseAmount, headercomponentid: componentId, actionType: actionType, componentDetails: item },
      disableClose: true,
      panelClass: 'dialog-class'
    });
    dialogRef.afterClosed().subscribe((result: ReturnResult<any>) => {
      if (result) {
        this.getProjectComponent.emit(true);
      }
    })
  }

  public rowItemDetails(data: Partial<projectComponentData>) {
    this.onClickEdit(data.actionType, data.componentDetails);
  }

}
