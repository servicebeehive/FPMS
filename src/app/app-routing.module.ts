import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './common/services/gaurd/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then((l) => l.LoginModule)
  },
  {
    path: 'authorized',
    loadChildren: () => import('./components/authorized/authorized.module').then((a) => a.AuthorizedModule),
    canActivate: [AuthGaurdService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
