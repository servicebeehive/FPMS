import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { projectCreationDetails } from 'src/app/models/project-creation.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public showProjectCreation: boolean;
  public prjectCreationFormsDetails: projectCreationDetails;

  constructor(public projectService: ProjectService,
    public masterDataService: MasterDataService,
    public fb: FormBuilder) { }

  public addProjectCreation = this.fb.group({
    projectName: ['', Validators.required],
    tenure: ['', Validators.required],
    financialYear: ['', Validators.required]
  })

  ngOnInit(): void {
    this.showProjectCreation = false;
  }

  public onClickProjectCreation() {
    this.showProjectCreation = true;
    this.prjectCreationFormsDetails = <projectCreationDetails>this.addProjectCreation.value
    this.prjectCreationFormsDetails.tabs = Array.from({ length: Number(this.prjectCreationFormsDetails.tenure) }, (_, index) => index + 1);
    console.log(this.prjectCreationFormsDetails);
  }

}
