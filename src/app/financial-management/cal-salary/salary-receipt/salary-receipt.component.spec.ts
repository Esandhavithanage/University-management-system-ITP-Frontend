import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryReceiptComponent } from './salary-receipt.component';

describe('SalaryReceiptComponent', () => {
  let component: SalaryReceiptComponent;
  let fixture: ComponentFixture<SalaryReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
