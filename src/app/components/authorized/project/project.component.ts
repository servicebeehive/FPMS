import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReturnResult } from 'src/app/common/models/return-result';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { editProjectDetails } from 'src/app/models/edit-project-details.model';
import { projectCreationDetails } from 'src/app/models/project-creation.model';
import { projectDetails } from 'src/app/models/project-details.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public showProjectCreation: boolean;
  public prjectCreationFormsDetails: projectCreationDetails;
  public editProjectDetails: editProjectDetails;

  constructor(public projectService: ProjectService,
    public masterDataService: MasterDataService,
    public fb: FormBuilder,
    public activatedRoute: ActivatedRoute) { }

  // public addProjectCreation = this.fb.group({
  //   projectName: ['Test Project', Validators.required],
  //   tenure: [3, Validators.required],
  //   financialYear: [1, Validators.required]
  // })

  public addProjectCreation = this.fb.group({
    projectName: this.fb.control<string | undefined>('', Validators.required),
    tenure: this.fb.control<number | undefined>(null, Validators.required),
    financialYear: this.fb.control<number | undefined>(null, Validators.required)
  })

  ngOnInit(): void {
    this.showProjectCreation = false;
    this.activatedRoute.queryParams.subscribe((value: { id: number }) => {
      if (value.id) {
        this.onEditProjectHeader(value.id);
      }
    })
  }

  public onClickProjectCreation(projectYearBudget?: budgetYearDetails[]) {
    this.showProjectCreation = true;
    this.prjectCreationFormsDetails = this.addProjectCreation.value as projectCreationDetails
    const tabs = Array.from({ length: Number(this.prjectCreationFormsDetails.tenure) }, (_, index) => index + 1);
    this.prjectCreationFormsDetails.tabs = this.setFinancialYears(tabs, this.addProjectCreation.value.financialYear);
    if (projectYearBudget) {
      projectYearBudget.forEach((item: budgetYearDetails) => {
        const index = this.prjectCreationFormsDetails.tabs.findIndex((element: budgetYearDetails) => element.planyear === item.planyear);
        this.prjectCreationFormsDetails.tabs[index].budgetamount = item.amountconsumed;
        this.prjectCreationFormsDetails.tabs[index].projectid = item.projectheadid;
        this.prjectCreationFormsDetails.tabs[index].yearbudgetid = item.yearbudgetid;
      })
    }
  }

  public setFinancialYears(tabs: number[], startFinancialYear: number): budgetYearDetails[] {
    let data: budgetYearDetails[] = [];

    const { financialyear } = this.masterDataService.globalMasterData;
    const fydesc = financialyear.filter(element => element.fyid === startFinancialYear)[0].fydesc;
    let i = tabs.length;
    while (i--) {
      const fydescArray = fydesc.split('-');
      const upperYear = Number(fydescArray[0]) + i;
      const lowerYear = Number(fydescArray[1]) + i;
      const newFyDesc = `${upperYear}-${lowerYear}`

      const convertedYear: budgetYearDetails = {
        projectid: 0,
        planyear: newFyDesc,
        budgetamount: null,
        yearbudgetid: 0
      }
      data.push(convertedYear);

    }
    return data.reverse()
  }

  onEditProjectHeader(id: number) {
    const getProjectHeaderDetail = {
      projectheadid: id
    };
    this.projectService.getProjectInfoDetails(getProjectHeaderDetail).then((res: ReturnResult<editProjectDetails>) => {
      if (res.success) {
        this.editProjectDetails = res.data;
        if (this.editProjectDetails.projectdetails !== null) {
          this.addProjectCreation.controls.projectName.setValue(this.editProjectDetails?.projectdetails.project_name);
          this.addProjectCreation.controls.tenure.setValue(this.editProjectDetails?.projectdetails.project_tenure);
          this.addProjectCreation.controls.financialYear.setValue(Number(this.editProjectDetails?.projectdetails.financial_year));
          this.onClickProjectCreation(this.editProjectDetails.projectyearbudget);
        }
      }
    })
  }

}
