import { Component, Input, OnChanges } from '@angular/core';
import { projectDetails } from 'src/app/models/project-details.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnChanges {

  @Input() projectDetails: projectDetails;

  constructor() { }

  ngOnChanges(): void {
    // if (this.projectDetails) {
    //   console.log('projectDetails', this.projectDetails);
    // }
  }

}
