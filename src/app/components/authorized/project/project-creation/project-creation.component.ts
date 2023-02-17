import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  public tabNumber: budgetYearDetails[];
  public projectDetails: projectDetails;

  constructor() { }

  ngOnChanges(): void {
    const { tabs } = this.projectCreationDetailsForTabs;
    this.tabNumber = tabs;
    if (this.editProjectHeaderDetails) {
      this.projectDetails = this.editProjectHeaderDetails.projectdetails;
    }
  }

  public tabYearAmount(value: budgetYearDetails[]) {
    this.tabNumber = value;
  }

}
