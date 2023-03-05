import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { projectSubmissionValidation } from 'src/app/common/models/project-submission-validation.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { ProjectSubmissionValidationService } from 'src/app/common/services/project-submission-validation/project-submission-validation.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { componentDetails, projectComponentDetails } from 'src/app/models/project-component-details.model';
import { ProjectService } from 'src/app/services/project.service';
import { CreateComponentsComponent } from './create-components/create-components.component';

interface componentTypeDetails {
  id: boolean,
  type: string
}

@Component({
  selector: 'app-project-components',
  templateUrl: './project-components.component.html',
  styleUrls: ['./project-components.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectComponentsComponent implements OnChanges {



  expandedElement: projectComponentDetails | null;

  @Input() planYearAmount: budgetYearDetails;

  public actionButtons: string[] = ['Add', 'Edit', 'Delete'];

  public componentType: componentTypeDetails[] = [{ id: true, type: 'Component Header' }, { id: false, type: 'Header Element' }]

  public getProjectListData: projectComponentDetails;



  public addProjectComponent = this.fb.group({
    budgetamount: [0, Validators.required],
    planyear: ['', Validators.required],
    projectid: [0, Validators.required],
    amountSpends: [0],
    remainingAmount: [0]
  })
  constructor(public fb: FormBuilder,
    public notificationService: NotificationService<any>,
    public dialog: MatDialog,
    public projectService: ProjectService,
    public projectSubmissionValidationService: ProjectSubmissionValidationService) { }

  ngOnChanges(): void {
    this.setFormData();
    this.setBudgetYearAmount(this.planYearAmount);
    if (this.planYearAmount.projectid !== 0) {
      this.projectComponentDetailYear();
    }
  }

  setFormData() {
    if (this.planYearAmount) {
      this.addProjectComponent.get('budgetamount')?.setValue(this.planYearAmount.budgetamount);
      this.addProjectComponent.get('planyear')?.setValue(this.planYearAmount.planyear);
      this.addProjectComponent.get('projectid')?.setValue(this.planYearAmount.projectid);
      this.addProjectComponent.get('remainingAmount')?.setValue(this.planYearAmount.budgetamount);

      this.addProjectComponent.controls.budgetamount.disable();
      this.addProjectComponent.controls.planyear.disable();
      this.addProjectComponent.controls.remainingAmount.disable();
      this.addProjectComponent.controls.amountSpends.disable();
    }
  }

  onComponentHeaderClick() {
    if (this.planYearAmount.projectid === 0) {
      const data: ReturnResult = {
        data: null,
        success: false,
        message: 'Please create the Project header'
      }
      this.notificationService.showNotification(data);
      return
    }

    const dialogRef = this.dialog.open(CreateComponentsComponent, {
      data: { planYearAmount: this.planYearAmount, headercomponentid: 0 },
      disableClose: true,
      panelClass: 'dialog-class'
    });
    dialogRef.afterClosed().subscribe((result: ReturnResult<any>) => {
      if (result) {
        this.projectComponentDetailYear();
      }
    })
  }

  public projectComponentDetailYear() {
    const detailYearData = {
      projectheadid: this.planYearAmount.projectid,
      projectcomponentyear: this.planYearAmount.planyear
    }
    this.projectService.getProjectComponentDetailsBYYear(detailYearData).then((res: ReturnResult<projectComponentDetails>) => {
      if (res.success) {
        this.getProjectListData = res.data;
        this.projectAmountCalculation(this.getProjectListData.projectcomponent);
      }
    })
  }

  getCallProjectComponent(value: boolean) {
    if (value) {
      this.projectComponentDetailYear();
    }
  }

  setBudgetYearAmount(amountDetail: budgetYearDetails) {
    const data: projectSubmissionValidation = {
      year: amountDetail.planyear,
      totalYearBudgetAmount: amountDetail.budgetamount,
      remainingYearBudgetAmount: amountDetail.budgetamount,
      spendAmount: 0,
      isvalid: false,
      projectid: amountDetail.projectid
    }
    this.projectSubmissionValidationService.updateProjectAmount(data);
  }

  projectAmountCalculation(componentData: componentDetails[]) {
    let yearDetail: string;
    let componentElementData: createProjectComponent[] = []
    if (componentData.length > 0) {
      yearDetail = componentData[0].componentheader?.planyear;
      componentData.forEach(element => {
        if (element.componentelement.length > 0) {
          element.componentelement.forEach(value => {
            componentElementData.push(value);
          })
        }
      })
      if (componentElementData.length > 0) {
        const amountDetails = componentElementData.reduce(function (acc, curval) { return acc + curval.amount }, 0);
        const index = this.projectSubmissionValidationService.amountDetails.findIndex(value => value.year.trim() === yearDetail.trim());
        if (index >= 0) {
          this.projectSubmissionValidationService.amountDetails[index].spendAmount = amountDetails;
          const remianingAmount = this.projectSubmissionValidationService.amountDetails[index].totalYearBudgetAmount - amountDetails;
          this.projectSubmissionValidationService.amountDetails[index].remainingYearBudgetAmount = remianingAmount;
          this.addProjectComponent.get('amountSpends')?.setValue(this.projectSubmissionValidationService.amountDetails[index].spendAmount);
          this.addProjectComponent.get('remainingAmount')?.setValue(this.projectSubmissionValidationService.amountDetails[index].remainingYearBudgetAmount);
        }
      }
    }
  }

}
