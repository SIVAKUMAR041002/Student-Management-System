import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudenComponent } from './view-studen.component';

describe('ViewStudenComponent', () => {
  let component: ViewStudenComponent;
  let fixture: ComponentFixture<ViewStudenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewStudenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
