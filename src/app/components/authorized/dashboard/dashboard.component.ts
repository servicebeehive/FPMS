import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/common/components/shared/components/confirmation-dialog/confirmation-dialog.component';
import { confirmationDialogModel } from 'src/app/common/models/confirmation-dialog-data.model';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { statusCode } from 'src/app/common/models/enums/status-code.enum.model';
import { masterData } from 'src/app/common/models/master-data.model';
import { projectFilterData } from 'src/app/common/models/project-filter-data.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { tableActionData } from 'src/app/common/models/table-action-data.model';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { financialYearDetails } from 'src/app/models/financialyear-details.model';
import { projectDetails } from 'src/app/models/project-details.model';
import { rangeDetails } from 'src/app/models/range-details.model';
import { statusDetails } from 'src/app/models/status-details.model';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[ConfirmationDialogComponent]
  
})
export class DashboardComponent implements OnInit {

  public actionButtons: string[] = ['edit', 'delete', 'view summary']
  public getProjectListTableData: projectDetails[];
  public getProjectListCollectionData: projectDetails[];
  public masterDataCollection: masterData;
  public actionTypes = ActionTypes;
  public statusDetails = statusCode;
  public columnDisplay: string[] = ['project_id', 'project_name', 'financial_year_desc', 'project_tenure', 'status']

  constructor(public projectService: ProjectService,public dialog: MatDialog,
    public router: Router,
    public masterDataService: MasterDataService, public loader:LoadingService,
    public notificationService: NotificationService<ReturnResult>) { }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  public getProjectDetails() {
    this.projectService.getProjectList().then(res => {
      if (res.success) {
        this.masterDataCollection = this.masterDataService.globalMasterData;
        this.getProjectListCollectionData = res.data;
        this.getProjectListTableData = this.mapProjectData(res.data);
      }
    })
  }

  public onProjectFilterData(data: projectFilterData) {
  this.loader._loading.next(true)
    let financialYearData: financialYearDetails;
    let rangeData: rangeDetails;
    let statusData: statusDetails;
    let projectListCollectionData = this.getProjectListCollectionData;
    if (data.financialYear) {
      financialYearData = this.masterDataCollection.financialyear.filter(res => res.fyid === data.financialYear)[0];
      projectListCollectionData = projectListCollectionData.filter(res => res.financial_year === String(financialYearData.fyid));
    }
    if (data.range) {
      rangeData = this.masterDataCollection.range.filter(res => res.rangeid === data.range)[0];
      projectListCollectionData = projectListCollectionData.filter(res => res.range === rangeData.rangedesc);
    }
    if (data.status) {
      statusData = this.masterDataCollection.status.filter(res => res.statusid === data.status)[0];
      projectListCollectionData = projectListCollectionData.filter(res => res.statuscode === statusData.statuscode);
    }
    if (data.projectName) {
      projectListCollectionData = projectListCollectionData.filter(res => res.project_name.trim().toLocaleLowerCase().includes(data.projectName.trim().toLocaleLowerCase()));
    }
    this.getProjectListTableData = this.mapProjectData(projectListCollectionData);
    this.loader._loading.next(false)
  }

  public onGetActionItem(actionItem: tableActionData<projectDetails>) {
    switch (actionItem.actionType) {
      case this.actionTypes.edit:
        this.onClickEditAction(actionItem.data);
        break;
      case this.actionTypes.delete:
        this.onClickDeleteAction(actionItem.data);
        break;
      case this.actionTypes.viewSummary:
        this.onClickViewSummaryAction(actionItem.data);
        break;
    }
  }

  public mapProjectData(resultData: projectDetails[]): projectDetails[] {
    // const data: projectDetails[] = resultData.map(({ project_id, project_name, financial_year_desc, project_tenure, status }) => ({ project_id, project_name, financial_year_desc, project_tenure, status }));
    return resultData;
  }

  public onClickEditAction(data: projectDetails) {
    const statusCode = this.masterDataCollection.status.filter(element => element.statusdesc === data.status)[0].statuscode;
    if (statusCode === this.statusDetails.Draft || statusCode === this.statusDetails.OnHold) {
      this.router.navigate(['authorized/project'], {
        queryParams: {
          id: data.project_id
        }
      });
    }
    else {
      const data: ReturnResult = {
        data: null,
        success: false,
        message: 'Can not edit , project is in progress mode.'
      }
      this.notificationService.showNotification(data);
    }
  }

  public onClickViewSummaryAction(data: projectDetails) {
    const statusCode = this.masterDataCollection.status.filter(element => element.statusdesc === data.status)[0].statuscode;
    if (statusCode === this.statusDetails.InProcess) {
      this.router.navigate(['authorized/summary'], {
        queryParams: {
          id: data.project_id
        }
      });
    }
    else {
      const data: ReturnResult = {
        data: null,
        success: false,
        message: 'Can not view summary, project is in draft mode.'
      }
      this.notificationService.showNotification(data);
    }
  }

  public onClearProjectFilter() {
    this.getProjectDetails();
  }

  public onClickDeleteAction(item: createProjectComponent) {
    console.log(item)
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
          // componentid: item?.componentid,
          projectheadid: item.project_id,
          // year: null,
          // sorno: null,
          // workdetail: null,
          // quantity: null,
          // uom: null,
          // rate: null,
          // geolocation: null,
          // materialreq: false,
          // startdate: null,
          // enddate: null,
          // isheader: false,
          // headercomponentid: null,
          operationtype: 'DELETE'
        }
        this.projectService.createProjectComponent(componentData).then((res: ReturnResult<any>) => {
          if (res.success) {
            this.getProjectDetails()
          }
          this.notificationService.showNotification(res);
        })
      }
    });
  }

}
