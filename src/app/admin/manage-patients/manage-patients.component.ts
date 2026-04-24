// src/app/admin/manage-patients/manage-patients.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.scss']
})
export class ManagePatientsComponent implements OnInit {
  patients: any[] = [];
  filtered: any[] = [];
  searchTerm = '';
  loading = true;
 
  constructor(private http: HttpClient, public auth: AuthService) {}
 
  ngOnInit(): void { this.load(); }
 
  load(): void {
    this.loading = true;
    this.http.get(`${API}/admin/patients`).subscribe({
      next: (data: any) => {
        this.patients = data;
        this.applyFilter();
        this.loading = false;
      }
    });
  }
 
  applyFilter(): void {
    this.filtered = this.patients.filter(p =>
      !this.searchTerm ||
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
