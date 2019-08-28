import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyRequestComponent } from './money-request.component';

describe('MoneyRequestComponent', () => {
  let component: MoneyRequestComponent;
  let fixture: ComponentFixture<MoneyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
