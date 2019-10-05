import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaymentsComponent } from './all-payments.component';

describe('AllPaymentsComponent', () => {
  let component: AllPaymentsComponent;
  let fixture: ComponentFixture<AllPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
