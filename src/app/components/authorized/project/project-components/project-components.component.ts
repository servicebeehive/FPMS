import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReturnResult } from 'src/app/common/models/return-result';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { componentDetails, projectComponentDetails } from 'src/app/models/project-component-details.model';
import { ProjectService } from 'src/app/services/project.service';
import { CreateComponentsComponent } from '../dialogs/create-components/create-components.component';

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
    componentHeadreType: [null, Validators.required]
  })
  constructor(public fb: FormBuilder,
    public notificationService: NotificationService<any>,
    public dialog: MatDialog,
    public projectService: ProjectService,) { }

  ngOnChanges(): void {
    this.setFormData();
  }

  setFormData() {
    if (this.planYearAmount) {
      this.addProjectComponent.get('budgetamount')?.setValue(this.planYearAmount.budgetamount);
      this.addProjectComponent.get('planyear')?.setValue(this.planYearAmount.planyear);
      this.addProjectComponent.get('projectid')?.setValue(this.planYearAmount.projectid);

      this.addProjectComponent.controls.budgetamount.disable();
      this.addProjectComponent.controls.planyear.disable();
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
      data: { planYearAmount: this.planYearAmount, componentHeadreType: this.addProjectComponent.value.componentHeadreType },
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
      }
    })
  }

}
