import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIncomeComponent } from './all-income.component';

describe('AllIncomeComponent', () => {
  let component: AllIncomeComponent;
  let fixture: ComponentFixture<AllIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
