import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/common/services/account/account.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter();

  constructor(public accountService: AccountService,
    public router: Router) { }

  ngOnInit(): void {
  }

  public onClickSideNav() {
    this.sideNavToggle.emit();
  }

  public onClickLogout() {
    if (this.accountService.isLoggedIn()) {
      this.accountService.setAccessToken(null);
      this.router.navigate(['login']);
    }
  }

}
