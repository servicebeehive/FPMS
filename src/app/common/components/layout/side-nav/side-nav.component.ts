import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { routerModel } from 'src/app/common/models/router.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() routers: routerModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
