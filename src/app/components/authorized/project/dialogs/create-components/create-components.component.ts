import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReturnResult } from 'src/app/common/models/return-result';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { componentHeaderDeatils } from 'src/app/models/component-header.model';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { projectComponentData } from 'src/app/models/project-component-data.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-components',
  templateUrl: './create-components.component.html',
  styleUrls: ['./create-components.component.scss'],
  providers: [DatePipe]
})
export class CreateComponentsComponent implements OnInit {

  public headerDetails: componentHeaderDeatils[] = [];

  constructor(public matDialogRef: MatDialogRef<CreateComponentsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: projectComponentData,
    public fb: FormBuilder,
    public projectService: ProjectService,
    public datepipe: DatePipe,
    public notificationService: NotificationService<ReturnResult>) {
  }

  public addComponentInformation = this.fb.group({
    year: [''],
    sorno: ['', Validators.required],
    workdetail: ['', Validators.required],
    quantity: [null, Validators.required],
    uom: ['', Validators.required],
    amount: [null, Validators.required],
    rate: [null, Validators.required],
    geolocation: ['', Validators.required],
    startdate: [this.datepipe.transform(Date(), 'yyyy-MM-dd'), Validators.required],
    enddate: [this.datepipe.transform(Date(), 'yyyy-MM-dd'), Validators.required],
    headercomponent: [null, Validators.required],
    materialRequired: [false],
  })

  ngOnInit(): void {
    if (this.dialogData.planYearAmount) {
      this.addComponentInformation.controls.year.setValue(this.dialogData.planYearAmount.planyear);
      this.addComponentInformation.controls.year.disable();
    }
    if (this.dialogData.componentHeadreType) {
      this.addComponentInformation.controls.quantity.clearValidators();
      this.addComponentInformation.controls.quantity.updateValueAndValidity();

      this.addComponentInformation.controls.uom.clearValidators();
      this.addComponentInformation.controls.uom.updateValueAndValidity();

      this.addComponentInformation.controls.amount.clearValidators();
      this.addComponentInformation.controls.amount.updateValueAndValidity();

      this.addComponentInformation.controls.rate.clearValidators();
      this.addComponentInformation.controls.rate.updateValueAndValidity();

      this.addComponentInformation.controls.geolocation.clearValidators();
      this.addComponentInformation.controls.geolocation.updateValueAndValidity();

      this.addComponentInformation.controls.startdate.clearValidators();
      this.addComponentInformation.controls.startdate.updateValueAndValidity();

      this.addComponentInformation.controls.enddate.clearValidators();
      this.addComponentInformation.controls.enddate.updateValueAndValidity();

      this.addComponentInformation.controls.headercomponent.clearValidators();
      this.addComponentInformation.controls.headercomponent.updateValueAndValidity();
    }
    this.getComponentHedareDetails()


  }

  onClickCancel() {
    this.matDialogRef.close();
  }

  public getComponentHedareDetails() {
    const { projectid } = this.dialogData.planYearAmount;
    const componentData: createProjectComponent = {
      projectheadid: projectid,
      isheader: true,
      operationtype: 'GETHEADERLIST'
    }
    this.projectService.createProjectComponent(componentData).then((res: ReturnResult<componentHeaderDeatils[]>) => {
      if (res.success) {
        this.headerDetails = res.data;
      }
    })
  }

  onClickProjectComponent() {
    const { projectid, planyear } = this.dialogData.planYearAmount;
    const { componentHeadreType } = this.dialogData
    const componentData: createProjectComponent = {
      componentid: 0,
      projectheadid: projectid,
      year: planyear,
      sorno: this.addComponentInformation.value.sorno,
      workdetail: this.addComponentInformation.value.workdetail,
      quantity: this.addComponentInformation.value.quantity,
      uom: this.addComponentInformation.value.uom,
      rate: this.addComponentInformation.value.rate,
      geolocation: this.addComponentInformation.value.geolocation,
      materialreq: this.addComponentInformation.value.materialRequired,
      startdate: this.addComponentInformation.value.startdate,
      enddate: this.addComponentInformation.value.enddate,
      isheader: componentHeadreType,
      headercomponentid: this.addComponentInformation.value.headercomponent,
      operationtype: 'INSERT'
    }
    this.projectService.createProjectComponent(componentData).then((res: ReturnResult<any>) => {
      if (res.success) {
        this.matDialogRef.close(res);
      }
      this.notificationService.showNotification(res);
    })
  }

}
