import { Component, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
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

  public columnToDispaly: string[] = ['sorno', 'workdetail', 'startdate', 'enddate', 'action'];

  public dataSource: componentDetails[];
  public columnsToDisplayWithExpand: string[];
  public actionTypes = ActionTypes;

  constructor(public dialog: MatDialog) { }

  ngOnChanges(): void {

    this.dataSource = this.projectComponentData;
    this.columnsToDisplayWithExpand = [...this.columnToDispaly, 'expand'];

  }

  onClickExpand(element: createProjectComponent) {
    element.isheader = !element.isheader
  }

  onClickEdit(actionType: string, item: createProjectComponent) {
    switch (actionType) {
      case (this.actionTypes.edit):
        break;
      case (this.actionTypes.insert):
        break;
      case (this.actionTypes.delete):
        break;
    }
    const dialogRef = this.dialog.open(CreateComponentsComponent, {
      data: { planYearAmount: this.planYearWiseAmount, headercomponentid: item.componentid, actionType: actionType },
      disableClose: true,
      panelClass: 'dialog-class'
    });
    // dialogRef.afterClosed().subscribe((result: ReturnResult<any>) => {
    //   if (result) {
    //     this.projectComponentDetailYear();
    //   }
    // })
  }

}
