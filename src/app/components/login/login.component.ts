import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReturnResult } from 'src/app/common/models/return-result';
import { AccountService } from 'src/app/common/services/account/account.service';
import { MasterDataService } from 'src/app/common/services/master-data/master-data.service';
import { userDetails } from 'src/app/models/user-details.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService,
    public masterDataService: MasterDataService,
    public fb: FormBuilder,
    public route: Router,
    public accountService: AccountService) { }


  public checkLoginForm = this.fb.group({
    userName: ['testuser', Validators.required],
    password: ['testuser', Validators.required],
    division: [1, Validators.required],
    role: [1, Validators.required]
  })


  ngOnInit(): void {
  }

  onClickLogin() {
    const loginData: userDetails = {
      username: this.checkLoginForm.value.userName,
      pwd: this.checkLoginForm.value.password,
      divisionid: this.checkLoginForm.value.division,
      roleid: this.checkLoginForm.value.role,
    }
    this.loginService.loginUser(loginData).then((res: ReturnResult<userDetails>) => {
      if (res.success) {
        this.accountService.setAccessToken(res.data.usertoken);
        this.route.navigateByUrl("authorized/dashboard");
      }
    })
  }

}
