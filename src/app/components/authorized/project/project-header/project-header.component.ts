import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ReturnResult } from 'src/app/common/models/return-result';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
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
  public projectHeaderId: number;

  @Input() public set tabYear(arr: budgetYearDetails[]) {
    this._tabYear = arr;
    this.loadYear();
  };

  @Input() public set formsDetails(arr: projectCreationDetails) {
    this._projectCreationDetails = arr;
  }

  @Output() public budgetYearAmount = new EventEmitter<budgetYearDetails[]>();

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

  // public addProjectHeader = this.fb.group({
  //   division: [1, Validators.required],
  //   subDivision: [1, Validators.required],
  //   range: [1, Validators.required],
  //   village: [1, Validators.required],
  //   tahsil: [1, Validators.required],
  //   samittee: [2, Validators.required],
  //   vidhansabha: [1, Validators.required],
  //   beat: [1, Validators.required],
  //   compartmentNo: [1, Validators.required],
  //   site: ['Test Site 1', Validators.required],
  //   totalArea: ['23', Validators.required],
  //   apoYear: ['2023', Validators.required],
  //   projectArea: ['45', Validators.required],
  //   schemeName: [1, Validators.required],
  //   executionName: ['Test Execution Name'],
  //   executionSupervisor: ['Test Execution Supervisor', Validators.required],
  //   executionPost: ['Test Execution Post', Validators.required],
  //   budgetHead: ['3', Validators.required],

  //   addYearInformation: this.fb.array([]),
  // })

  constructor(public fb: FormBuilder,
    public masterDataService: MasterDataService,
    public projectService: ProjectService,
    public notificationService: NotificationService<any>) { }

  get formControl() {
    return this.addProjectHeader.get('addYearInformation') as FormArray;
  }

  ngOnInit(): void {
  }

  onClickProjectHeader(): void {
    const projectDetails: projectHeaderDetails = {
      projectheadid: this.isSaved ? this.projectHeaderId : 0,
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
      operationtype: this.isSaved ? "UPDATE" : "INSERT",
      budgetyear: this.addProjectHeader.value.addYearInformation as budgetYearDetails[]
    }
    this.projectService.insertProjectDetails(projectDetails).then((res: ReturnResult<[{ id: number }]>) => {
      if (res.success) {
        this.projectHeaderId = res.data[0].id;
        this.setProjectHeaderID(res.data[0].id);
        this.isSaved = true;
        this.budgetYearAmount.emit(this.formControl.value as budgetYearDetails[]);
      }
      this.notificationService.showNotification(res);
    })
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
