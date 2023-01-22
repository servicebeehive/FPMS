import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent implements OnInit {

  private _tabYear: number[]

  @Input() public set tabYear(arr: number[]) {
    this._tabYear = arr;
    this.loadYear();
  };

  public get tabYear(): number[] {
    return this._tabYear;
  }

  public addProjectHeader = this.fb.group({
    projectName: ['', Validators.required],
    division: ['', Validators.required],
    subDivision: ['', Validators.required],
    range: ['', Validators.required],
    village: ['', Validators.required],
    tahsil: ['', Validators.required],
    samittee: ['', Validators.required],
    vidhansabha: ['', Validators.required],
    beat: [''],
    compartmentNo: ['', Validators.required],
    site: ['', Validators.required],
    totalArea: ['', Validators.required],
    apoYear: ['', Validators.required],
    financialYear: ['', Validators.required],
    projectTenure: ['', Validators.required],
    projectArea: ['', Validators.required],
    schemeName: ['', Validators.required],
    executionName: ['', Validators.required],
    executionSupervisor: ['', Validators.required],
    executionPost: ['', Validators.required],
    budgetHead: ['', Validators.required],

    addYearInformation: this.fb.array([]),
  })

  constructor(public fb: FormBuilder,
    public masterDataService: MasterDataService) { }

  get formControl() {
    return this.addProjectHeader.get('addYearInformation') as FormArray;
  }

  ngOnInit(): void {
  }

  onClickProjectHeader(): void {
    console.log('addProjectHeader', this.addProjectHeader.value)
  }

  loadYear() {
    this.formControl.clear();
    this.tabYear.forEach((elemnt, i) => {
      this.formControl.push(this.fb.group({
        year: [i + 1],
        amount: ['', Validators.required]
      }))
    })
    console.log('addProjectHeader', this.addProjectHeader.value)
  }

}
