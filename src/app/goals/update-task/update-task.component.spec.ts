import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskComponent } from './update-task.component';

describe('UpdateTaskComponent', () => {
  let component: UpdateTaskComponent;
  let fixture: ComponentFixture<UpdateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
/*
    <mat-card-footer>
      <p>Total Task Time: {{ totalTaskTime }} hours</p>
      <!-- Display any other necessary information here -->
    </mat-card-footer>
*/