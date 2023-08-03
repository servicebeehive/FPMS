import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { componentHeaderDeatils } from 'src/app/models/component-header.model';
import { createProjectComponent } from 'src/app/models/create-project-component.model';
import { projectComponentData } from 'src/app/models/project-component-data.model';
import { compenentDetails } from 'src/app/models/state-per-hec-details.model';
import { ProjectService } from 'src/app/services/project.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-create-state-component',
  templateUrl: './create-state-component.component.html',
  styleUrls: ['./create-state-component.component.scss'],
  providers: [DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})

export class CreateStateComponentComponent implements OnInit {

  public headerDetails: componentHeaderDeatils[] = [];
  public actionTypes = ActionTypes;

  constructor(public matDialogRef: MatDialogRef<CreateStateComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: compenentDetails,
    public fb: FormBuilder,
    public projectService: ProjectService,
    public datepipe: DatePipe,
    public notificationService: NotificationService<ReturnResult>) {
  }

  public addComponentInformation = this.fb.group({
    workdetail: this.fb.control<string | undefined>('', Validators.required),
    quantity: this.fb.control<number | undefined>(null, Validators.required),
    uom: this.fb.control<string | undefined>('', Validators.required),
    amount: this.fb.control<number | undefined>(null, Validators.required),
    rate: this.fb.control<number | undefined>(null, Validators.required),
    startdate: this.fb.control<any | undefined>(moment(), Validators.required),
    enddate: this.fb.control<any | undefined>(moment(), Validators.required),
    materialRequired: this.fb.control<boolean | undefined>(false, Validators.required),
    componentHeadreType:this.fb.control<boolean | undefined>(false),
  })

  ngOnInit(): void {
    const dailogData = this.dialogData;
    if (this.dialogData) {
      this.addComponentInformation.controls.componentHeadreType.setValue(dailogData?.isheader);
      if (dailogData.isheader) {
        this.addComponentInformation.controls.workdetail.setValue(dailogData?.taskdesc);
      }
      else{
          this.addComponentInformation.controls.workdetail.setValue(dailogData?.taskdesc);
          this.addComponentInformation.controls.quantity.setValue(dailogData?.quantity);
          this.addComponentInformation.controls.uom.setValue(dailogData?.rate_uom);
          this.addComponentInformation.controls.rate.setValue(dailogData?.rate);
          this.addComponentInformation.controls.materialRequired.setValue(dailogData?.materialreq);
          this.addComponentInformation.controls.startdate.setValue(dailogData?.startmonth===""?moment():moment(new Date(dailogData?.startmonth)));
          this.addComponentInformation.controls.enddate.setValue(dailogData?.endmonth===""?moment():moment(new Date(dailogData?.endmonth)));
          this.addComponentInformation.controls.amount.setValue(dailogData?.maxexpd);

          this.addComponentInformation.controls.quantity.disable();
          this.addComponentInformation.controls.uom.disable();
          this.addComponentInformation.controls.rate.disable();
          this.addComponentInformation.controls.materialRequired.disable();
          this.addComponentInformation.controls.amount.disable();
      }
      this.onChangeHeader(dailogData?.isheader);
    }

  }

  onChangeHeader(value: boolean) {
    if (value) {
      this.addComponentInformation.controls.quantity.clearValidators();
      this.addComponentInformation.controls.quantity.updateValueAndValidity();

      this.addComponentInformation.controls.uom.clearValidators();
      this.addComponentInformation.controls.uom.updateValueAndValidity();

      this.addComponentInformation.controls.amount.clearValidators();
      this.addComponentInformation.controls.amount.updateValueAndValidity();

      this.addComponentInformation.controls.rate.clearValidators();
      this.addComponentInformation.controls.rate.updateValueAndValidity();

      this.addComponentInformation.controls.startdate.clearValidators();
      this.addComponentInformation.controls.startdate.updateValueAndValidity();

      this.addComponentInformation.controls.enddate.clearValidators();
      this.addComponentInformation.controls.enddate.updateValueAndValidity();

    } else {
      this.addComponentInformation.controls.quantity.setValidators(Validators.required);
      this.addComponentInformation.controls.quantity.updateValueAndValidity();

      this.addComponentInformation.controls.uom.setValidators(Validators.required);
      this.addComponentInformation.controls.uom.updateValueAndValidity();

      this.addComponentInformation.controls.amount.setValidators(Validators.required);
      this.addComponentInformation.controls.amount.updateValueAndValidity();

      this.addComponentInformation.controls.rate.setValidators(Validators.required);
      this.addComponentInformation.controls.rate.updateValueAndValidity();

      this.addComponentInformation.controls.startdate.setValidators(Validators.required);
      this.addComponentInformation.controls.startdate.updateValueAndValidity();

      this.addComponentInformation.controls.enddate.setValidators(Validators.required);
      this.addComponentInformation.controls.enddate.updateValueAndValidity();

    }
  }

  onClickCancel() {
    this.matDialogRef.close();
  }

  chosenYearHandler(normalizedYear: Moment,condition:boolean) {
    if(condition){
    const ctrlValue = this.addComponentInformation.value.startdate;
    ctrlValue.year(normalizedYear.year());
    this.addComponentInformation.controls.startdate.setValue(ctrlValue);
    }else{
      const ctrlValue = this.addComponentInformation.value.enddate;
      ctrlValue.year(normalizedYear.year());
      this.addComponentInformation.controls.enddate.setValue(ctrlValue);
    }
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>,condition:boolean) {
    if(condition){
      const ctrlValue = this.addComponentInformation.value.startdate;
      ctrlValue.month(normalizedMonth.month());
      this.addComponentInformation.controls.startdate.setValue(ctrlValue);
      datepicker.close();
    }
    else{
      const ctrlValue = this.addComponentInformation.value.enddate;
      ctrlValue.month(normalizedMonth.month());
      this.addComponentInformation.controls.enddate.setValue(ctrlValue);
      datepicker.close();
    }
  }

  onClickProjectComponent() {
    const updatedDialogData = this.dialogData;
    if(!updatedDialogData.isheader){
      const differMonth = moment(this.addComponentInformation.value.enddate).diff(moment(this.addComponentInformation.value.startdate),'months', true);
      if(differMonth < 0){
        const messageNotifier:ReturnResult<any> ={
          data:null,
          message:'Start Date Should not be greater than end date',
          success:false
          }
          this.notificationService.showNotification(messageNotifier);
          return
      }
      updatedDialogData.endmonth = moment(this.addComponentInformation.value.enddate).format().toString();
      updatedDialogData.startmonth = moment(this.addComponentInformation.value.startdate).format().toString();
    }
    updatedDialogData.taskdesc = this.addComponentInformation.value.workdetail;

    this.matDialogRef.close(updatedDialogData);
  }

}

