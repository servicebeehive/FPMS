import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReturnResult } from 'src/app/common/models/return-result';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { projectDetails } from 'src/app/models/project-details.model';
import { projectHeaderDetails } from 'src/app/models/projectheader.model';

@Component({
  selector: 'app-state-project-creation',
  templateUrl: './state-project-creation.component.html',
  styleUrls: ['./state-project-creation.component.scss']
})
export class StateProjectCreationComponent implements OnChanges {

  @Input() projectDetailsForEdit: projectDetails;
  public projectheadid:number = 0

  public addProjectHeader = this.fb.group({
    division: this.fb.control<number | undefined>(null, Validators.required),
    subDivision: this.fb.control<number | undefined>(null, Validators.required),
    range: this.fb.control<number | undefined>(null, Validators.required),
    village: this.fb.control<number | undefined>(null, Validators.required),
    tahsil: this.fb.control<number | undefined>(null, Validators.required),
    samittee: this.fb.control<number | undefined>(null, Validators.required),
    vidhansabha: this.fb.control<number | undefined>(null, Validators.required),
    beat: this.fb.control<number | undefined>(null, Validators.required),
    compartmentNo: this.fb.control<number | undefined>(null, Validators.required),
    site: this.fb.control<string | undefined>('', Validators.required),
    apoYear: this.fb.control<string | undefined>('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    projectArea: this.fb.control<string | undefined>('', Validators.required),
    schemeName: this.fb.control<number | undefined>(null, Validators.required),
    executionName: this.fb.control<string | undefined>(''),
    executionSupervisor: this.fb.control<string | undefined>('', Validators.required),
    executionPost: this.fb.control<string | undefined>('', Validators.required),
    budgetHead: this.fb.control<number | undefined>(null, Validators.required)
  })

  constructor(public fb: FormBuilder,
    public masterDataService: MasterDataService,
    public notificationService:NotificationService<any>) { }

    ngOnChanges(): void {
      if(this.projectDetailsForEdit){
        this.setFormControlsForEdit();
      }

  }

  onClickProjectHeaderDetails() : projectHeaderDetails{
    if(!this.addProjectHeader.valid){
      const messageNotifier:ReturnResult<any> ={
        data:null,
        message:'Please check the Project Header Details',
        success:false
        }
        this.notificationService.showNotification(messageNotifier);
      return;
    }
    const projectDetails: projectHeaderDetails = {
      projectheadid: this.projectheadid,
      divisionid: this.addProjectHeader.value.division,
      subdivisionid: this.addProjectHeader.value.subDivision,
      rangeid: this.addProjectHeader.value.range,
      villageid: this.addProjectHeader.value.village,
      tahsilid: this.addProjectHeader.value.tahsil,
      samitteedid: this.addProjectHeader.value.samittee,
      vidhansabhaid: this.addProjectHeader.value.vidhansabha,
      beatid: this.addProjectHeader.value.beat,
      compantmentid: this.addProjectHeader.value.compartmentNo,
      statuscode: "D",
      site: this.addProjectHeader.value.site,
      apoyear: this.addProjectHeader.value.apoYear,
      projectarea: this.addProjectHeader.value.projectArea,
      schemeid: this.addProjectHeader.value.schemeName,
      executionsupervisor: this.addProjectHeader.value.executionSupervisor,
      executionpost: this.addProjectHeader.value.executionPost,
      budgetheaddesc: this.addProjectHeader.value.budgetHead,
      projecttask:[],
      operationtype:  this.projectheadid===0?"INSERT":"UPDATE",
    }
    return projectDetails;
  }

  setFormControlsForEdit() {
    this.projectheadid = this.projectDetailsForEdit.projectheadid;
    this.addProjectHeader.controls.division.setValue(this.projectDetailsForEdit.divisionid);
    this.addProjectHeader.controls.subDivision.setValue(this.projectDetailsForEdit.subdivisionid);
    this.addProjectHeader.controls.range.setValue(this.projectDetailsForEdit.rangeid);
    this.addProjectHeader.controls.village.setValue(this.projectDetailsForEdit.villageid);
    this.addProjectHeader.controls.tahsil.setValue(this.projectDetailsForEdit.tahsilid);
    this.addProjectHeader.controls.samittee.setValue(this.projectDetailsForEdit.samitteedid);
    this.addProjectHeader.controls.vidhansabha.setValue(this.projectDetailsForEdit.vidhansabhaid);
    this.addProjectHeader.controls.beat.setValue(this.projectDetailsForEdit.beatid);
    this.addProjectHeader.controls.compartmentNo.setValue(this.projectDetailsForEdit.compantmentid);
    this.addProjectHeader.controls.site.setValue(this.projectDetailsForEdit.site);
    this.addProjectHeader.controls.apoYear.setValue(this.projectDetailsForEdit.approval_year);
    this.addProjectHeader.controls.projectArea.setValue(this.projectDetailsForEdit.project_area);
    this.addProjectHeader.controls.schemeName.setValue(this.projectDetailsForEdit.schemeid);
    this.addProjectHeader.controls.executionSupervisor.setValue(this.projectDetailsForEdit.execution_supervisor);
    this.addProjectHeader.controls.executionPost.setValue(this.projectDetailsForEdit.execution_post);
    this.addProjectHeader.controls.budgetHead.setValue(this.projectDetailsForEdit.budgethead);
  }

}
