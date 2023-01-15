import { Component, OnInit } from '@angular/core';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit {

  constructor(public masterDataService: MasterDataService) { }

  ngOnInit(): void {
  }

}
