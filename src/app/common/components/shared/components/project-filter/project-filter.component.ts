import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {

  @ViewChild('clickMenuTrigger') clickMenuTrigger: MatMenuTrigger;

  public addProjectFilter = this.fb.group({
    financialYear: this.fb.control<number | undefined>(null),
    range: this.fb.control<number | undefined>(null),
    status: this.fb.control<number | undefined>(null),
    projectName: this.fb.control<string | undefined>(''),
    CriteriaBudget: this.fb.control<string | undefined>(null)
  })

  @Output() public projectFilter = new EventEmitter;
  @Output() public clearProjectFilter = new EventEmitter;

  constructor(public masterDataService: MasterDataService,
    public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onProjectFilter() {
    this.clickMenuTrigger.closeMenu();
    this.projectFilter.emit(this.addProjectFilter.value);
  }

  onClickClearFilter() {
    this.addProjectFilter.reset();
    this.clearProjectFilter.emit();
    this.clickMenuTrigger.closeMenu();
  }

}
