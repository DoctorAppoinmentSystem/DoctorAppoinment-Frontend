// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
 
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
 
  // Auth routes (lazy loaded)
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
 
  // Patient routes (lazy loaded, role-guarded)
  {
    path: 'patient',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Patient' },
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
  },
 
  // Doctor routes (lazy loaded, role-guarded)
  {
    path: 'doctor',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Doctor' },
    loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule)
  },
 
  // Admin routes (lazy loaded, role-guarded)
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
 
  { path: '**', redirectTo: '/login' }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

