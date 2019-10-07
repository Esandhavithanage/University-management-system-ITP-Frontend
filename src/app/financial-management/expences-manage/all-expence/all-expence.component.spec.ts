import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExpenceComponent } from './all-expence.component';

describe('AllExpenceComponent', () => {
  let component: AllExpenceComponent;
  let fixture: ComponentFixture<AllExpenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllExpenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExpenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
