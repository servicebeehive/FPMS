import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { compenentDetails, statePerHecDataDetails } from 'src/app/models/state-per-hec-details.model';
import { StateProjectComponentDetailsComponent } from '../state-project-component-details/state-project-component-details.component';
import { StateProjectCreationComponent } from '../state-project-creation/state-project-creation.component';
import { projectHeaderDetails } from 'src/app/models/projectheader.model';

@Component({
  selector: 'app-state-project-details',
  templateUrl: './state-project-details.component.html',
  styleUrls: ['./state-project-details.component.scss']
})
export class StateProjectDetailsComponent implements OnChanges {

  @Input() public stateProjectComponentData: statePerHecDataDetails;
  step:number=0;

  @ViewChild(StateProjectComponentDetailsComponent) stateProjectComponentDetails:StateProjectComponentDetailsComponent;
  @ViewChild(StateProjectCreationComponent) stateProjectCreation:StateProjectCreationComponent;

  constructor() { }

  ngOnChanges(): void {
    if(this.stateProjectComponentData?.project_year_data){
    const data = this.stateProjectComponentData?.project_year_data.sort((a,b)=>{
      return a.taskyear-b.taskyear
    })
    this.stateProjectComponentData.project_year_data = data;
  }
  }

  onClickStateProjectDetails():projectHeaderDetails{
    let componentData : compenentDetails[] = [];
    if(!this.stateProjectComponentDetails || !this.stateProjectCreation){
      console.log('Error : Create Project');
      return 
    }
    const projectHeaderDetails = this.stateProjectCreation.onClickProjectHeaderDetails();
    if(!projectHeaderDetails){
      console.log('Error : projectHeaderDetails');
      return
    }
    console.log('ProjectHeaderDetails',projectHeaderDetails);
    console.log('ProjectHeaderDetails',projectHeaderDetails.projecttask);
    this.stateProjectComponentData.project_year_data.forEach(x=>{
      this.stateProjectComponentData.calculated_ht_data[x.case.toLowerCase()].forEach(y=>{
        componentData.push(y);
      })
    })
    projectHeaderDetails.projecttask = componentData;
    projectHeaderDetails.projecttenure = this.stateProjectComponentData.project_year_data.length;
    return projectHeaderDetails;
  }
  setStep(index: number) {
    this.step = index;
   }
   Save(){
    this.step++;
 
   }
   

 

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
