import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { tableActionData } from 'src/app/common/models/table-action-data.model';
import { projectDetails } from 'src/app/models/project-details.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public actionButtons: string[] = ['edit', 'delete']
  public getProjectListData: projectDetails[];

  public actionTypes = ActionTypes;

  constructor(public projectService: ProjectService,
    public router: Router) { }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  public getProjectDetails() {
    this.projectService.getProjectList().then(res => {
      if (res.success) {
        const resultData = res.data;
        const data: projectDetails[] = resultData.map(({ project_id, project_name, financial_year, project_tenure, statuscode }) => ({ project_id, project_name, financial_year, project_tenure, statuscode }));
        this.getProjectListData = data;
      }
    })
  }

  public onClickCreateProject() {
    // this.router.navigateByUrl('authorized/project');
    this.router.navigate(['authorized/project'])
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

  public onClickEditAction(data: projectDetails) {
    this.router.navigate(['authorized/project'], {
      queryParams: {
        id: data.project_id
      }
    });
  }

  public onClickDeleteAction(data: projectDetails) {
    console.log('delete', data);
  }

}
