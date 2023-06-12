import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { statePerHecDataDetails } from 'src/app/models/state-per-hec-details.model';

@Component({
  selector: 'app-state-project-details',
  templateUrl: './state-project-details.component.html',
  styleUrls: ['./state-project-details.component.scss']
})
export class StateProjectDetailsComponent implements OnChanges {

  @Input() public stateProjectComponentData: statePerHecDataDetails;

  constructor() { }

  ngOnChanges(): void {
    this.stateProjectComponentData?.project_year_data.forEach(element => {
      const yearData = element.case.toLowerCase();
    });
  }

}
