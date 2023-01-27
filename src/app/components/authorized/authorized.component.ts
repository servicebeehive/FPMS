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
      label: "Dashboard",
      route: "dashboard",
      icon: "",
    },
    {
      label: "Project",
      route: "project",
      icon: "",
    },
    {
      label: "Financial",
      route: "financial",
      icon: "",
    },
    {
      label: "Report",
      route: "report",
      icon: "",
    },
    {
      label: "Setting",
      route: "setting",
      icon: "",
    },
    {
      label: "User",
      route: "user",
      icon: "",
    },
    {
      label: "Voucher",
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
