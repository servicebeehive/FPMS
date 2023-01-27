import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {

  public addProjectFilter = this.fb.group({
    financialYear: [null],
    range: [null],
    status: [null],
    projectName: ['']
  })

  @Output() public projectCreation = new EventEmitter;

  constructor(public masterDataService: MasterDataService,
    public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onCreareProject() {
    this.projectCreation.emit();
  }

}
