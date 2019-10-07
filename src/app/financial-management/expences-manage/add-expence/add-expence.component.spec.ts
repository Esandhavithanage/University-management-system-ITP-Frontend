import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenceComponent } from './add-expence.component';

describe('AddExpenceComponent', () => {
  let component: AddExpenceComponent;
  let fixture: ComponentFixture<AddExpenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
