import { Component, OnInit } from '@angular/core';
import { routerModel } from 'src/app/common/models/router.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit {

  public isOpenSideBar: boolean = true;
  public loading$ = this.loader.loading$;

  public routerData: routerModel[] = [
    {
      label: "Dashboard",
      route: "dashboard",
      icon: "dashboard",
    },
    {
      label: "Project",
      route: "project",
      icon: "assignment",
    },
    {
      label: "Financial",
      route: "financial",
      icon: "card_travel",
    },
    {
      label: "Report",
      route: "report",
      icon: "assessment",
    },
    {
      label: "Setting",
      route: "setting",
      icon: "settings",
    },
    {
      label: "User",
      route: "user",
      icon: "people",
    },
    {
      label: "Voucher",
      route: "voucher",
      icon: "local_offer",
    }
  ]

  constructor(public loader: LoadingService) { }

  ngOnInit(): void {
  }

  public onClickSideNavToggle() {
    this.isOpenSideBar = !this.isOpenSideBar;
  }

}
