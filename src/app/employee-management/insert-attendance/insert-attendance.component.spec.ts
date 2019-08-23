import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAttendanceComponent } from './insert-attendance.component';

describe('InsertAttendanceComponent', () => {
  let component: InsertAttendanceComponent;
  let fixture: ComponentFixture<InsertAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
