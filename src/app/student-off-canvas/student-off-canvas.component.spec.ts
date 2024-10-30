import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOffCanvasComponent } from './student-off-canvas.component';

describe('StudentOffCanvasComponent', () => {
  let component: StudentOffCanvasComponent;
  let fixture: ComponentFixture<StudentOffCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentOffCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
