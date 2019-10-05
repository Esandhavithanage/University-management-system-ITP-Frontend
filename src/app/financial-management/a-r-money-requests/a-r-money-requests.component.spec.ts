import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ARMoneyRequestsComponent } from './a-r-money-requests.component';

describe('ARMoneyRequestsComponent', () => {
  let component: ARMoneyRequestsComponent;
  let fixture: ComponentFixture<ARMoneyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ARMoneyRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ARMoneyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
