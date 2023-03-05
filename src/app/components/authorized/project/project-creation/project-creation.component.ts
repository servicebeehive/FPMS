import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ProjectSubmissionValidationService } from 'src/app/common/services/project-submission-validation/project-submission-validation.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { editProjectDetails } from 'src/app/models/edit-project-details.model';
import { projectCreationDetails } from 'src/app/models/project-creation.model';
import { projectDetails } from 'src/app/models/project-details.model';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.scss']
})
export class ProjectCreationComponent implements OnChanges {

  @Input() public projectCreationDetailsForTabs: projectCreationDetails;
  @Input() public editProjectHeaderDetails: editProjectDetails;

  @Output() public setSubmitProjectButton = new EventEmitter<boolean>();

  public tabNumber: budgetYearDetails[];
  public projectDetails: projectDetails;

  constructor(public projectSubmissionValidationService: ProjectSubmissionValidationService) { }

  ngOnChanges(): void {
    const { tabs } = this.projectCreationDetailsForTabs;
    this.tabNumber = tabs;
    if (this.editProjectHeaderDetails) {
      this.projectDetails = this.editProjectHeaderDetails.projectdetails;
    }
    this.projectSubmissionValidationService.amountDetails = [];
  }

  public tabYearAmount(value: budgetYearDetails[]) {
    this.setSubmitProjectButton.emit(true);
    this.tabNumber = value;
  }

}
