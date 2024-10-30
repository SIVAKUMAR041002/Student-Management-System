import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinStudentComponent } from './join-student.component';

describe('JoinStudentComponent', () => {
  let component: JoinStudentComponent;
  let fixture: ComponentFixture<JoinStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
