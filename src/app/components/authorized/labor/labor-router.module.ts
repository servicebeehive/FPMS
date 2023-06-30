import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaborComponent } from './labor-rate/labor.component';

const routes: Routes = [{
  path: '',
  component: LaborComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaborRoutingModule { }
