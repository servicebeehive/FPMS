import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReturnResult } from 'src/app/common/models/return-result';
import { summaryDeatils } from 'src/app/models/summary-details.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public projectSummaryDetails: summaryDeatils;
  public projectId: number;

  constructor(public activatedRoute: ActivatedRoute,
    public projectService: ProjectService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((value: { id: number }) => {
      if (value.id) {
        this.projectId = value.id;
        this.getProjectSummaryDetails(value.id);
      }
    })
  }

  public getProjectSummaryDetails(id: number) {
    const data = {
      projectheaderid: id
    }
    this.projectService.getstateummaryData(data).then((res: ReturnResult<summaryDeatils>) => {
      if (res.success) {
        this.projectSummaryDetails = res.data;
        console.log(this.projectSummaryDetails.projectdetails.project_name)
      }
    })
  }

  public onAttachmentActionButtonClicked(value: boolean) {
    if (value) {
      this.getProjectSummaryDetails(this.projectId);
    }
  }

}
