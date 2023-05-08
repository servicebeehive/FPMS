import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHeaderDetailsComponent } from './project-header-details.component';

describe('ProjectHeaderDetailsComponent', () => {
  let component: ProjectHeaderDetailsComponent;
  let fixture: ComponentFixture<ProjectHeaderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectHeaderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectHeaderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
