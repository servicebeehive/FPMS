import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/common/components/shared/components/confirmation-dialog/confirmation-dialog.component';
import { confirmationDialogModel } from 'src/app/common/models/confirmation-dialog-data.model';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { projectComponentData } from 'src/app/models/project-component-data.model';
import { componentDetails } from 'src/app/models/project-component-details.model';
import { ProjectService } from 'src/app/services/project.service';
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

  constructor(public dialog: MatDialog,
    public projectService: ProjectService,
    public notificationService: NotificationService<any>) { }

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
    if (actionType === this.actionTypes.delete) {
      this.onDeleteItem(item);
      return;
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

  public onDeleteItem(item: createProjectComponent) {
    const dialogData: confirmationDialogModel = {
      actionTitle: 'Delete',
      message: 'Are you sure you want to delete ?',
      action: ActionTypes.delete
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = dialogData;
    const dialogRef = this.dialog.open
      (ConfirmationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
      if (dialogResult) {
        const componentData: createProjectComponent = {
          componentid: item?.componentid,
          projectheadid: item.projectheadid,
          year: '',
          sorno: '',
          workdetail: '',
          quantity: null,
          uom: '',
          rate: null,
          geolocation: '',
          materialreq: false,
          startdate: '',
          enddate: '',
          isheader: false,
          headercomponentid: null,
          operationtype: 'DELETE'
        }
        this.projectService.createProjectComponent(componentData).then((res: ReturnResult<any>) => {
          this.notificationService.showNotification(res);
        })
      }
    });
  }

}
