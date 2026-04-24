// src/app/doctor/doctor.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
 
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorDashboardComponent } from './dashboard/dashboard.component';
import { DoctorAppointmentsComponent } from './appointments/appointments.component';
import { DoctorScheduleComponent } from './schedule/schedule.component';
import { SharedModule } from '../shared/shared.module';
 
@NgModule({
  declarations: [
    DoctorDashboardComponent,
    DoctorAppointmentsComponent,
    DoctorScheduleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DoctorRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class DoctorModule { }
