import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';

@Component({
  selector: 'app-project-componet-state',
  templateUrl: './project-componet-state.component.html',
  styleUrls: ['./project-componet-state.component.scss']
})
export class ProjectComponetStateComponent implements OnInit {
  step = 0;
  public addProjectHeader = this.fb.group({
    division: this.fb.control<number | undefined>(null, Validators.required),
    subDivision: this.fb.control<number | undefined>(null, Validators.required),
    range: this.fb.control<number | undefined>(null, Validators.required),
    village: this.fb.control<number | undefined>(null, Validators.required),
    tahsil: this.fb.control<number | undefined>(null, Validators.required),
    samittee: this.fb.control<number | undefined>(null, Validators.required),
    vidhansabha: this.fb.control<number | undefined>(null, Validators.required),
    beat: this.fb.control<number | undefined>(null, Validators.required),
    compartmentNo: this.fb.control<number | undefined>(null, Validators.required),
    site: this.fb.control<string | undefined>('', Validators.required),
    totalArea: this.fb.control<string | undefined>('', Validators.required),
    apoYear: this.fb.control<string | undefined>('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    projectArea: this.fb.control<string | undefined>('', Validators.required),
    schemeName: this.fb.control<number | undefined>(null, Validators.required),
    executionName: this.fb.control<string | undefined>(''),
    executionSupervisor: this.fb.control<string | undefined>('', Validators.required),
    executionPost: this.fb.control<string | undefined>('', Validators.required),
    budgetHead: this.fb.control<number | undefined>(null, Validators.required),

  })


  constructor(public fb: FormBuilder,
    public masterDataService: MasterDataService
    ) { }

  ngOnInit(): void {
  }
  setStep(index: number) {
   this.step = index;
  }
  Save(){
   this.step++;

  }
}
