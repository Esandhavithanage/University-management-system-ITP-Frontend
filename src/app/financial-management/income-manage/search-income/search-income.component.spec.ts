import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIncomeComponent } from './search-income.component';

describe('SearchIncomeComponent', () => {
  let component: SearchIncomeComponent;
  let fixture: ComponentFixture<SearchIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
