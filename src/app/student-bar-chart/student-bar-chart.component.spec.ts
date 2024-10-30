import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBarChartComponent } from './student-bar-chart.component';

describe('StudentBarChartComponent', () => {
  let component: StudentBarChartComponent;
  let fixture: ComponentFixture<StudentBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
