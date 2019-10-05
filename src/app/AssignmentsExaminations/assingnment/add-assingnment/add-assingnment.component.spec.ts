import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssingnmentComponent } from './add-assingnment.component';

describe('AddAssingnmentComponent', () => {
  let component: AddAssingnmentComponent;
  let fixture: ComponentFixture<AddAssingnmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssingnmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssingnmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
