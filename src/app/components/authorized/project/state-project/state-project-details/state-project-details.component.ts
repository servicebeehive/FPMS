import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { compenentDetails, statePerHecDataDetails } from 'src/app/models/state-per-hec-details.model';
import { StateProjectComponentDetailsComponent } from '../state-project-component-details/state-project-component-details.component';
import { StateProjectCreationComponent } from '../state-project-creation/state-project-creation.component';
import { projectHeaderDetails } from 'src/app/models/projectheader.model';
import { projectDetails } from 'src/app/models/project-details.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { NotificationService } from 'src/app/common/services/notification/notification.service';

@Component({
  selector: 'app-state-project-details',
  templateUrl: './state-project-details.component.html',
  styleUrls: ['./state-project-details.component.scss']
})
export class StateProjectDetailsComponent implements OnChanges {

  @Input() public stateProjectComponentData: statePerHecDataDetails;
  @Input() public isEdit: boolean =false;
  public step:number=0;
  public stateProjectDetails : projectDetails;

  @ViewChild(StateProjectComponentDetailsComponent) stateProjectComponentDetails:StateProjectComponentDetailsComponent;
  @ViewChild(StateProjectCreationComponent) stateProjectCreation:StateProjectCreationComponent;

  constructor(public notificationService:NotificationService<any>) { }

  ngOnChanges(): void {
    if(this.stateProjectComponentData?.project_year_data){
    const data = this.stateProjectComponentData?.project_year_data.sort((a,b)=>{
      return a.taskyear-b.taskyear
    })
    this.stateProjectComponentData.project_year_data = data;
    if(this.isEdit){
      this.stateProjectDetails = this.stateProjectComponentData?.project_header_data[0];
    }
  }
  }

  onClickStateProjectDetails():projectHeaderDetails{
    let componentData : compenentDetails[] = [];
    if(!this.stateProjectComponentDetails || !this.stateProjectCreation){
      const messageNotifier:ReturnResult<any> ={
        data:null,
        message:'Please create the project.',
        success:false
        }
        this.notificationService.showNotification(messageNotifier);
      return 
    }
    const projectHeaderDetails = this.stateProjectCreation.onClickProjectHeaderDetails();
    if(!projectHeaderDetails){
      return
    }
    this.stateProjectComponentData.project_year_data.forEach(x=>{
      this.stateProjectComponentData.calculated_ht_data[x.case.toLowerCase()].forEach(y=>{
        componentData.push(y);
      })
    })
    projectHeaderDetails.projecttask = componentData;
    projectHeaderDetails.projecttenure = this.stateProjectComponentData.project_year_data.length;
    return projectHeaderDetails;
  }

  onDeletedAction(value: compenentDetails[]){
    const yearDesc = this.stateProjectComponentData.project_year_data.filter(x=>x.taskyear===value[0].taskyear);
    const componentDeatils = <compenentDetails[]>this.stateProjectComponentData.calculated_ht_data[yearDesc[0].case.toLowerCase()];
    const index = componentDeatils.findIndex(x=>x.tasksequance===value[0].tasksequance);
    this.stateProjectComponentData.calculated_ht_data[yearDesc[0].case.toLowerCase()].splice(index, 1);
  }
}
