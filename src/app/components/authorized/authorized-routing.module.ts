import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from 'src/app/common/services/gaurd/auth-gaurd.service';
import { AuthorizedComponent } from './authorized.component';

const routes: Routes = [{
  path: '',
  component: AuthorizedComponent,
  canActivate: [AuthGaurdService],
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then((d) => d.DashboardModule)
    },
    {
      path: 'financial',
      loadChildren: () => import('./financial/financial.module').then((f) => f.FinancialModule)
    },
    {
      path: 'project',
      loadChildren: () => import('./project/project.module').then((p) => p.ProjectModule)
    },
    {
      path: 'report',
      loadChildren: () => import('./report/report.module').then((r) => r.ReportModule)
    },
    {
      path: 'setting',
      loadChildren: () => import('./setting/setting.module').then((s) => s.SettingModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then((u) => u.UserModule)
    },
    {
      path: 'voucher',
      loadChildren: () => import('./voucher/voucher.module').then((v) => v.VoucherModule)
    },
    {
      path: 'summary',
      loadChildren: () => import('./summary/summary.module').then((s) => s.SummaryModule)
    },
    {
      path: 'state',
      loadChildren: () => import('./project/project-components/project-componet-state/project-component-state.module').then((s) => s.ProjectComponentStateModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizedRoutingModule { }
