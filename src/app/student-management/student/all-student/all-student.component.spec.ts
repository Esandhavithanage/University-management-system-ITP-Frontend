import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStudentComponent } from './all-student.component';

describe('AllStudentComponent', () => {
  let component: AllStudentComponent;
  let fixture: ComponentFixture<AllStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
