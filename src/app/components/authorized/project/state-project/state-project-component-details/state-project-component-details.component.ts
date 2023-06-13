import { Component, Input, OnChanges } from '@angular/core';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { compenentDetails } from 'src/app/models/state-per-hec-details.model';

@Component({
  selector: 'app-state-project-component-details',
  templateUrl: './state-project-component-details.component.html',
  styleUrls: ['./state-project-component-details.component.scss']
})
export class StateProjectComponentDetailsComponent implements OnChanges {

  @Input() public componentDataDetails: compenentDetails[];
  @Input() public year: string;

  public columnToDispaly: string[] = ['tasksequance', 'taskdesc', 'startdate', 'enddate', 'rate_uom', 'rate', 'action'];
  public dataSource: compenentDetails[];
  public actionTypes = ActionTypes;

  constructor() { }


  ngOnChanges() {
    if (this.componentDataDetails) {
      this.dataSource = this.componentDataDetails;
    }
  }

  onClickEdit(value: any, data: any) {

  }


}
