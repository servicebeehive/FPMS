import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaborComponent } from './labor-rate/labor.component';
import { ProjectLaborComponent } from './project-labor/project-labor.component';

const routes: Routes = [{
  path: '',
  redirectTo:'labor-rate',
  pathMatch:'full',
 },
  {path:'labor-rate', component:LaborComponent},
  {path:'project-labor', component:ProjectLaborComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborRoutingModule { }
