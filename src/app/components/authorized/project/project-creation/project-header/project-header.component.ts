import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { projectSubmissionValidation } from 'src/app/common/models/project-submission-validation.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { ProjectSubmissionValidationService } from 'src/app/common/services/project-submission-validation/project-submission-validation.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { projectCreationDetails } from 'src/app/models/project-creation.model';
import { projectDetails } from 'src/app/models/project-details.model';
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

  @Input() public projectDetailsForEdit: projectDetails;

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
    totalArea: this.fb.control<string | undefined>('', Validators.required),
    apoYear: this.fb.control<string | undefined>('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    projectArea: this.fb.control<string | undefined>('', Validators.required),
    schemeName: this.fb.control<number | undefined>(null, Validators.required),
    executionName: this.fb.control<string | undefined>(''),
    executionSupervisor: this.fb.control<string | undefined>('', Validators.required),
    executionPost: this.fb.control<string | undefined>('', Validators.required),
    budgetHead: this.fb.control<number | undefined>(null, Validators.required),

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
  //   budgetHead: [3, Validators.required],

  //   addYearInformation: this.fb.array([]),
  // })

  constructor(public fb: FormBuilder,
    public masterDataService: MasterDataService,
    public projectService: ProjectService,
    public notificationService: NotificationService<any>,
    public projectSubmissionValidationService: ProjectSubmissionValidationService) { }

  get formControl() {
    return this.addProjectHeader.get('addYearInformation') as FormArray;
  }

  ngOnInit(): void {
    if (this.projectDetailsForEdit) {
      this.setFormControlsForEdit();
    }
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
      budgetheaddesc: this.addProjectHeader.value.budgetHead,
      operationtype: this.isSaved ? "UPDATE" : "INSERT",
      budgetyear: this.addProjectHeader.value.addYearInformation as budgetYearDetails[]
    }
    this.projectSubmissionValidationService.amountDetails = [];
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

  setFormControlsForEdit() {
    this.isSaved = true;
    this.projectHeaderId = this.projectDetailsForEdit.projectheadid;
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
    this.addProjectHeader.controls.totalArea.setValue(this.projectDetailsForEdit.totalarea);
    this.addProjectHeader.controls.apoYear.setValue(this.projectDetailsForEdit.approval_year);
    this.addProjectHeader.controls.projectArea.setValue(this.projectDetailsForEdit.project_area);
    this.addProjectHeader.controls.schemeName.setValue(this.projectDetailsForEdit.schemeid);
    this.addProjectHeader.controls.executionSupervisor.setValue(this.projectDetailsForEdit.execution_supervisor);
    this.addProjectHeader.controls.executionPost.setValue(this.projectDetailsForEdit.execution_post);
    this.addProjectHeader.controls.budgetHead.setValue(this.projectDetailsForEdit.budgethead);
  }



}
