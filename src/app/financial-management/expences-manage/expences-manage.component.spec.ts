import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencesManageComponent } from './expences-manage.component';

describe('ExpencesManageComponent', () => {
  let component: ExpencesManageComponent;
  let fixture: ComponentFixture<ExpencesManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpencesManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpencesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
