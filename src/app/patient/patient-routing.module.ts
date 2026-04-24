// src/app/patient/patient-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './dashboard/dashboard.component';
import { SearchDoctorsComponent } from './search-doctors/search-doctors.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { MyAppointmentsComponent } from './my-appointments/my-appointments.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',       component: PatientDashboardComponent },
  { path: 'search-doctors',  component: SearchDoctorsComponent },
  { path: 'book-appointment',component: BookAppointmentComponent },
  { path: 'my-appointments', component: MyAppointmentsComponent }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
