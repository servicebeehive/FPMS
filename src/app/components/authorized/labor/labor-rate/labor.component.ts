import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ActionTypes } from 'src/app/common/models/enums/action-button-types.enum.model';
import { statusCode } from 'src/app/common/models/enums/status-code.enum.model';
import { masterData } from 'src/app/common/models/master-data.model';
import { projectFilterData } from 'src/app/common/models/project-filter-data.model';
import { ReturnResult } from 'src/app/common/models/return-result';
import { tableActionData } from 'src/app/common/models/table-action-data.model';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { NotificationService } from 'src/app/common/services/notification/notification.service';
import { financialYearDetails } from 'src/app/models/financialyear-details.model';
import { laborDetails, labordata } from 'src/app/models/labor-details.model';
import { projectDetails } from 'src/app/models/project-details.model';
import { rangeDetails } from 'src/app/models/range-details.model';
import { statusDetails } from 'src/app/models/status-details.model';
import { LaborService } from 'src/app/services/labor.service';
import { ProjectService } from 'src/app/services/project.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.scss'],
  providers: [DatePipe, { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]

})
export class LaborComponent implements OnInit {
  public laborlistdata: any
  public labordetialsdata: labordata[]
  public laborformdata: FormGroup
  public actionButtons: string[] = []

  public actionTypes = ActionTypes;
  public statusDetails = statusCode;
  public columnDisplay: string[] = ['labourcost', 'createdby', 'createddate']
  currentDate: Date = new Date();
  constructor(public laborservice: LaborService,
    public router: Router,
    public masterDataService: MasterDataService,
    public notificationService: NotificationService<ReturnResult>, public formbuilder: FormBuilder, public DatePipe: DatePipe) { }

  ngOnInit(): void {
    // this.getProjectDetails();
    this.getlaborratedata()
    // this.getAttachmentDocumentDetails()
    this.laborformdata = this.formbuilder.group({
      laborrate: ['', [Validators.required]],
      createdate: ['', [Validators.required]]
    })
  }

  // public getProjectDetails() {
  //   this.labordetialsdata=[]
  // }



  public onGetActionItem(actionItem: tableActionData<projectDetails>) {
    switch (actionItem.actionType) {
      //case this.actionTypes.edit:
      // this.onClickEditAction(actionItem.data);
      // break;
      case this.actionTypes.delete:
        this.onClickDeleteAction(actionItem.data);
        break;

    }
  }





  public onClickDeleteAction(data: projectDetails) {
    console.log('delete', data);
  }
  public getAttachmentDocumentDetails() {

    let item = this.labordetialsdata.filter(item => (item.labourcost == this.laborformdata.controls['laborrate'].value && this.DatePipe.transform(item.createddate, 'YYYY-MM-dd') == this.DatePipe.transform(this.laborformdata.controls['createdate'].value, 'YYYY-MM-dd')))

    if (!this.laborformdata.valid) {

      return
    }
    else if (item.length > 0) {
      const data: ReturnResult = {
        data: null,
        success: false,
        message: 'Rate Already Available.'
      }
      this.notificationService.showNotification(data);
      return

    }

    else {
      const labordetails: laborDetails = {
        labourcost: this.laborformdata.controls['laborrate'].value,
        startdate: this.DatePipe.transform(this.laborformdata.controls['createdate'].value, 'YYYY-MM-dd'),
        operationtype: "INSERT"

      }
      this.laborservice.createlobarrate(labordetails).then((res: ReturnResult<any>) => {
        if (res.success == true) {
          const data: ReturnResult = {
            data: null,
            success: true,
            message: res.message
          }
          this.notificationService.showNotification(data);
          this.getlaborratedata()

        }
      })
    }
  }

  getlaborratedata() {
    const labordetails: laborDetails = {
      labourcost: null,
      startdate: null,
      operationtype: "LIST"

    }
    this.laborservice.createlobarrate(labordetails).then((res: ReturnResult<any>) => {
      if (res.success) {

        this.laborlistdata = res
        this.labordetialsdata = this.laborlistdata.labourcostlist.labourlist
       
      }
    })

  }
}


