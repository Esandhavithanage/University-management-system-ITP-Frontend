import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalSalaryComponent } from './cal-salary.component';

describe('CalSalaryComponent', () => {
  let component: CalSalaryComponent;
  let fixture: ComponentFixture<CalSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
