import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { projectDetails } from 'src/app/models/project-details.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public actionButtons: string[] = ['Add', 'Edit', 'Delete']
  public getProjectListData: projectDetails[]

  constructor(public projectService: ProjectService,
    public router: Router) { }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  public getProjectDetails() {
    this.projectService.getProjectList().then(res => {
      if (res.success) {
        const resultData = res.data;
        const data: projectDetails[] = resultData.map(({ project_name, financial_year, project_tenure, statuscode }) => ({ project_name, financial_year, project_tenure, statuscode }));
        this.getProjectListData = data;
      }
    })
  }

  public onClickCreateProject() {
    this.router.navigateByUrl('authorized/project')
  }

}
