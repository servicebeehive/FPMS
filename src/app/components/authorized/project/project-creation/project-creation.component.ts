import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { projectCreationDetails } from 'src/app/models/project-creation.model';

@Component({
  selector: 'app-project-creation',
  templateUrl: './project-creation.component.html',
  styleUrls: ['./project-creation.component.scss']
})
export class ProjectCreationComponent implements OnChanges {

  @Input() public projectCreationDetailsForTabs: projectCreationDetails;
  public tabNumber: number[];

  constructor() { }

  ngOnChanges(): void {
    const { tabs } = this.projectCreationDetailsForTabs;
    this.tabNumber = tabs;
  }

}
