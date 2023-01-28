import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { budgetYearDetails } from 'src/app/models/budgetyear.model';
import { projectComponentData } from 'src/app/models/project-component-data.model';

@Component({
  selector: 'app-create-components',
  templateUrl: './create-components.component.html',
  styleUrls: ['./create-components.component.scss']
})
export class CreateComponentsComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<CreateComponentsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: projectComponentData,
    public fb: FormBuilder) {
    console.log('componentHeadreType', this.dialogData.componentHeadreType)
    console.log('componentHeadreType', this.dialogData.planYearAmount)
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
    startdate: ['', Validators.required],
    enddate: ['', Validators.required],
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
    }
  }

  onClickCancel() {
    this.matDialogRef.close();
  }

}
