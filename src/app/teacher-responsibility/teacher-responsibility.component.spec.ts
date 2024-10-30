import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherResponsibilityComponent } from './teacher-responsibility.component';

describe('TeacherResponsibilityComponent', () => {
  let component: TeacherResponsibilityComponent;
  let fixture: ComponentFixture<TeacherResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherResponsibilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
