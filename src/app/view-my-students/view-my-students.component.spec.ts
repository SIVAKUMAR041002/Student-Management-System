import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyStudentsComponent } from './view-my-students.component';

describe('ViewMyStudentsComponent', () => {
  let component: ViewMyStudentsComponent;
  let fixture: ComponentFixture<ViewMyStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMyStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
