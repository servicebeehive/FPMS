import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponetStateComponent } from './project-componet-state.component';

const routes: Routes = [{
  path: '',
  component: ProjectComponetStateComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectComponentStateRoutingModule { }
