import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { projectHeaderDetails } from 'src/app/models/projectheader.model';

@Component({
  selector: 'app-state-project-creation',
  templateUrl: './state-project-creation.component.html',
  styleUrls: ['./state-project-creation.component.scss']
})
export class StateProjectCreationComponent implements OnInit {

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
    public masterDataService: MasterDataService) { }

  ngOnInit(): void {
  }

  onClickProjectHeaderDetails() : projectHeaderDetails{
    let today = new Date();
    console.log('this.addProjectHeader.valid',this.addProjectHeader.valid)
    if(!this.addProjectHeader.valid){
      console.log('Error : Project Header Details');
      return;
    }
    const projectDetails: projectHeaderDetails = {
      projectheadid: 0,
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
      operationtype:  "INSERT",
    }
    return projectDetails;
  }

}
