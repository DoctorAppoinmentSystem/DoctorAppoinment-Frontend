// src/app/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
 
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageDoctorsComponent } from './manage-doctors/manage-doctors.component';
import { ManagePatientsComponent } from './manage-patients/manage-patients.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';
 
@NgModule({
  declarations: [
    DashboardComponent,
    ManageDoctorsComponent,
    ManagePatientsComponent,
    ManageAppointmentsComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class AdminModule { }
