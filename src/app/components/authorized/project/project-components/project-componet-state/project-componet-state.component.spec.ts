import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponetStateComponent } from './project-componet-state.component';

describe('ProjectComponetStateComponent', () => {
  let component: ProjectComponetStateComponent;
  let fixture: ComponentFixture<ProjectComponetStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectComponetStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectComponetStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
