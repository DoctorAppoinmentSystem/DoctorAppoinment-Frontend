import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageDoctorsComponent } from './manage-doctors/manage-doctors.component';
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { StatisticsComponent } from './statistics/statistics.component';
 
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',           component: DashboardComponent },
  { path: 'manage-doctors',      component: ManageDoctorsComponent },
  { path: 'manage-patients',     component: ManagePatientsComponent },
  { path: 'manage-appointments', component: ManageAppointmentsComponent },
  { path: 'statistics',          component: StatisticsComponent }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
