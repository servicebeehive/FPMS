import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ReturnResult } from 'src/app/common/models/return-result';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { projectCreationDetails } from 'src/app/models/project-creation.model';
import { projectHeaderDetails } from 'src/app/models/projectheader.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent implements OnInit {

  private _tabYear: budgetYearDetails[];
  private _projectCreationDetails: projectCreationDetails
  public isSaved: boolean = false;

  @Input() public set tabYear(arr: budgetYearDetails[]) {
    this._tabYear = arr;
    this.loadYear();
  };

  @Input() public set formsDetails(arr: projectCreationDetails) {
    this._projectCreationDetails = arr;
    console.log('formsDetails', this.formsDetails)
  }

  public get tabYear(): budgetYearDetails[] {
    return this._tabYear;
  }

  public get formsDetails(): projectCreationDetails {
    return this._projectCreationDetails;
  }

  public addProjectHeader = this.fb.group({
    division: [null, Validators.required],
    subDivision: [null, Validators.required],
    range: [null, Validators.required],
    village: [null, Validators.required],
    tahsil: [null, Validators.required],
    samittee: [null, Validators.required],
    vidhansabha: [null, Validators.required],
    beat: [null, Validators.required],
    compartmentNo: [null, Validators.required],
    site: ['', Validators.required],
    totalArea: ['', Validators.required],
    apoYear: ['', Validators.required],
    projectArea: ['', Validators.required],
    schemeName: [null, Validators.required],
    executionName: [''],
    executionSupervisor: ['', Validators.required],
    executionPost: ['', Validators.required],
    budgetHead: ['', Validators.required],

    addYearInformation: this.fb.array([]),
  })

  constructor(public fb: FormBuilder,
    public masterDataService: MasterDataService,
    public projectService: ProjectService) { }

  get formControl() {
    return this.addProjectHeader.get('addYearInformation') as FormArray;
  }

  ngOnInit(): void {
  }

  onClickProjectHeader(): void {
    const projectDetails: projectHeaderDetails = {
      projectheadid: 0,
      projectname: this.formsDetails.projectName,
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
      totalarea: this.addProjectHeader.value.totalArea,
      apoyear: this.addProjectHeader.value.apoYear,
      financialyear: this.formsDetails.financialYear,
      projecttenure: this.formsDetails.tenure,
      projectarea: this.addProjectHeader.value.projectArea,
      schemeid: this.addProjectHeader.value.schemeName,
      executionsupervisor: this.addProjectHeader.value.executionSupervisor,
      executionpost: this.addProjectHeader.value.executionPost,
      budgetheaddesc: <string>this.addProjectHeader.value.budgetHead,
      operationtype: "INSERT",
      budgetyear: this.addProjectHeader.value.addYearInformation as budgetYearDetails[]
    }
    // this.projectService.insertProjectDetails(projectDetails).then((res: ReturnResult<any>) => {
    //   if (res.success) {
    //     this.isSaved = true;
    //     console.log('res', res)
    //   }
    // })
    console.log('addProjectHeader', this.addProjectHeader.value)
    console.log('projectDetails', projectDetails)
  }

  setProjectHeaderID(projectHeaderID) {
    this.tabYear.forEach((elemnt, i) => {
      this.formControl.controls[i].get('projectid')?.setValue(projectHeaderID);
    });
  }

  loadYear() {
    this.formControl.clear();
    this.tabYear.forEach((elemnt, i) => {
      this.formControl.push(this.fb.group({
        planyear: [elemnt.planyear],
        budgetamount: [elemnt.budgetamount, Validators.required],
        projectid: [elemnt.projectid],
      }))
    })
  }

}
