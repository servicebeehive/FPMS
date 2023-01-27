import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { projectCreationDetails } from 'src/app/models/project-creation.model';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.scss']
})
export class ProjectCreationComponent implements OnChanges {

  @Input() public projectCreationDetailsForTabs: projectCreationDetails;
  public tabNumber: budgetYearDetails[];

  constructor() { }

  ngOnChanges(): void {
    const { tabs } = this.projectCreationDetailsForTabs;
    this.tabNumber = tabs;
  }

}
