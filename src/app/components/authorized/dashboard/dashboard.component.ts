import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { masterData } from 'src/app/common/models/master-data.model';
import { projectFilterData } from 'src/app/common/models/project-filter-data.model';
import { tableActionData } from 'src/app/common/models/table-action-data.model';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { financialYearDetails } from 'src/app/models/financialyear-details.model';
import { projectDetails } from 'src/app/models/project-details.model';
import { rangeDetails } from 'src/app/models/range-details.model';
import { statusDetails } from 'src/app/models/status-details.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public actionButtons: string[] = ['edit', 'delete']
  public getProjectListTableData: projectDetails[];
  public getProjectListCollectionData: projectDetails[];
  public masterDataCollection: masterData;
  public actionTypes = ActionTypes;

  constructor(public projectService: ProjectService,
    public router: Router,
    public masterDataService: MasterDataService) { }

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
  }

  public onGetActionItem(actionItem: tableActionData<projectDetails>) {
    switch (actionItem.actionType) {
      case this.actionTypes.edit:
        this.onClickEditAction(actionItem.data);
        break;
      case this.actionTypes.delete:
        this.onClickDeleteAction(actionItem.data);
        break;
    }
  }

  public mapProjectData(resultData: projectDetails[]): projectDetails[] {
    const data: projectDetails[] = resultData.map(({ project_id, project_name, financial_year_desc, project_tenure, status }) => ({ project_id, project_name, financial_year_desc, project_tenure, status }));
    return data;
  }

  public onClickEditAction(data: projectDetails) {
    this.router.navigate(['authorized/project'], {
      queryParams: {
        id: data.project_id
      }
    });
  }

  public onClearProjectFilter() {
    this.getProjectDetails();
  }

  public onClickDeleteAction(data: projectDetails) {
    console.log('delete', data);
  }

}
