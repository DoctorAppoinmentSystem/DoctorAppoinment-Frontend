import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppointmentsComponent } from './manage-appointments.component';

describe('ManageAppointmentsComponent', () => {
  let component: ManageAppointmentsComponent;
  let fixture: ComponentFixture<ManageAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAppointmentsComponent]
    });
    fixture = TestBed.createComponent(ManageAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
