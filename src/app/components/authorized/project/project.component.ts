import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { projectCreationDetails } from 'src/app/models/project-creation.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public showProjectCreation: boolean;
  public prjectCreationFormsDetails: projectCreationDetails;

  constructor(public projectService: ProjectService,
    public masterDataService: MasterDataService,
    public fb: FormBuilder) { }

  public addProjectCreation = this.fb.group({
    projectName: ['yytyt', Validators.required],
    tenure: [3, Validators.required],
    financialYear: [1, Validators.required]
  })

  ngOnInit(): void {
    this.showProjectCreation = false;
  }

  public onClickProjectCreation() {
    this.showProjectCreation = true;
    this.prjectCreationFormsDetails = this.addProjectCreation.value as projectCreationDetails
    const tabs = Array.from({ length: Number(this.prjectCreationFormsDetails.tenure) }, (_, index) => index + 1);
    this.prjectCreationFormsDetails.tabs = this.setFinancialYears(tabs, this.addProjectCreation.value.financialYear)
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
        budgetamount: null
      }
      data.push(convertedYear);

    }
    return data.reverse()
  }

}
