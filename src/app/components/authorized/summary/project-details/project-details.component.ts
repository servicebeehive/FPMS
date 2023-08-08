import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { projectDetails } from 'src/app/models/project-details.model';
import { summaryDeatils } from 'src/app/models/summary-details.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnChanges {

  @Input() projectSummaryDetails: summaryDeatils;
  @Output() attachmentActionButtonClicked = new EventEmitter<boolean>();

  public projectDetails:any;

  constructor() { }

  ngOnChanges(): void {
    if (this.projectSummaryDetails) {
      console.log(this.projectSummaryDetails)
      this.projectDetails = this.projectSummaryDetails.project_header_data;
      console.log(this.projectDetails)
    }
  }

  public onClickedActionButton(value: boolean) {
    this.attachmentActionButtonClicked.emit(value);
  }

}
