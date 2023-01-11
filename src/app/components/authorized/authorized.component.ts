import { Component, OnInit } from '@angular/core';
import { routerModel } from 'src/app/common/models/router.model';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit {

  public isOpenSideBar: boolean = true;

  public routerData: routerModel[] = [
    {
      label: "dashboard",
      route: "dashboard",
      icon: "",
    },
    {
      label: "financial",
      route: "financial",
      icon: "",
    },
    {
      label: "project",
      route: "project",
      icon: "",
    },
    {
      label: "report",
      route: "report",
      icon: "",
    },
    {
      label: "setting",
      route: "setting",
      icon: "",
    },
    {
      label: "user",
      route: "user",
      icon: "",
    },
    {
      label: "voucher",
      route: "voucher",
      icon: "",
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public onClickSideNavToggle() {
    this.isOpenSideBar = !this.isOpenSideBar;
  }

}
