import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeletAssingnmentComponent } from './edit-delet-assingnment.component';

describe('EditDeletAssingnmentComponent', () => {
  let component: EditDeletAssingnmentComponent;
  let fixture: ComponentFixture<EditDeletAssingnmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeletAssingnmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeletAssingnmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
