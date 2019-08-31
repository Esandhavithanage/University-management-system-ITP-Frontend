import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeManageComponent } from './income-manage.component';

describe('IncomeManageComponent', () => {
  let component: IncomeManageComponent;
  let fixture: ComponentFixture<IncomeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
