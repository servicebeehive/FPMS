import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLaborComponent } from './project-labor.component';

describe('ProjectLaborComponent', () => {
  let component: ProjectLaborComponent;
  let fixture: ComponentFixture<ProjectLaborComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLaborComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
