// src/app/patient/patient.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
 
import { PatientRoutingModule } from './patient-routing.module';
import { PatientDashboardComponent } from './dashboard/dashboard.component';
import { SearchDoctorsComponent } from './search-doctors/search-doctors.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
import { SharedModule } from '../shared/shared.module';
import { StatusCountPipe } from './pipes/status-count.pipe';
 
@NgModule({
  declarations: [
    PatientDashboardComponent,
    SearchDoctorsComponent,
    BookAppointmentComponent,
    MyAppointmentsComponent,
    StatusCountPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PatientRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class PatientModule { }
