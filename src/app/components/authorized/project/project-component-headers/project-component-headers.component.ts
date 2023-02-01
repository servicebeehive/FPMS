import { Component, Input, OnChanges } from '@angular/core';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { componentDetails } from 'src/app/models/project-component-details.model';

@Component({
  selector: 'app-project-component-headers',
  templateUrl: './project-component-headers.component.html',
  styleUrls: ['./project-component-headers.component.scss']
})
export class ProjectComponentHeadersComponent implements OnChanges {

  @Input() projectComponentData: componentDetails[];

  public columnToDispaly: string[] = ['sorno', 'workdetail', 'startdate', 'enddate'];

  public dataSource: componentDetails[];
  public columnsToDisplayWithExpand: string[];

  constructor() { }

  ngOnChanges(): void {

    this.dataSource = this.projectComponentData;
    this.columnsToDisplayWithExpand = [...this.columnToDispaly, 'expand'];

  }

  onClickExpand(element: createProjectComponent) {
    element.isheader = !element.isheader
  }

}
