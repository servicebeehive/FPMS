import { Component, Input, OnChanges } from '@angular/core';
import { projectCreationDetails } from 'src/app/models/project-creation.model';

@Component({
  selector: 'app-project-components',
  templateUrl: './project-components.component.html',
  styleUrls: ['./project-components.component.scss']
})
export class ProjectComponentsComponent implements OnChanges {

  public actionButtons: string[] = ['Add', 'Edit', 'Delete']

  public getProjectListData


  constructor() { }

  ngOnChanges(): void {

  }

}
