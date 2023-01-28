import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReturnResult } from 'src/app/common/models/return-result';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { CreateComponentsComponent } from '../dialogs/create-components/create-components.component';

interface componentTypeDetails {
  id: boolean,
  type: string
}

@Component({
  selector: 'app-project-components',
  templateUrl: './project-components.component.html',
  styleUrls: ['./project-components.component.scss']
})
export class ProjectComponentsComponent implements OnChanges {

  @Input() planYearAmount: budgetYearDetails;

  public actionButtons: string[] = ['Add', 'Edit', 'Delete']

  public componentType: componentTypeDetails[] = [{ id: true, type: 'Component Header' }, { id: false, type: 'Header Element' }]

  public getProjectListData: [] = [];

  public addProjectComponent = this.fb.group({
    budgetamount: [0, Validators.required],
    planyear: ['', Validators.required],
    projectid: [0, Validators.required],
    componentHeadreType: [null, Validators.required]
  })
  constructor(public fb: FormBuilder,
    public notificationService: NotificationService<any>,
    public dialog: MatDialog) { }

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
    // if (this.planYearAmount.projectid === 0) {
    //   const data: ReturnResult = {
    //     data: null,
    //     success: false,
    //     message: 'Please create the Project header'
    //   }
    //   this.notificationService.showNotification(data);
    //   return
    // }

    const dialogRef = this.dialog.open(CreateComponentsComponent, {
      data: { planYearAmount: this.planYearAmount, componentHeadreType: this.addProjectComponent.value.componentHeadreType },
      disableClose: true,
      panelClass: 'dialog-class'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
    })
  }

}
