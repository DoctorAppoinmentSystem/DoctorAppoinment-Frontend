import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './dashboard/dashboard.component';
import { DoctorAppointmentsComponent } from './appointments/appointments.component';
import { DoctorScheduleComponent } from './schedule/schedule.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',    component: DoctorDashboardComponent },
  { path: 'appointments', component: DoctorAppointmentsComponent },
  { path: 'schedule',     component: DoctorScheduleComponent }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

