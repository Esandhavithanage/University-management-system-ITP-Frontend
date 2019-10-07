import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExpenceComponent } from './search-expence.component';

describe('SearchExpenceComponent', () => {
  let component: SearchExpenceComponent;
  let fixture: ComponentFixture<SearchExpenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchExpenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchExpenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
