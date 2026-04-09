// src/app/admin/manage-doctors/manage-doctors.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-manage-doctors',
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.scss']
})
export class ManageDoctorsComponent implements OnInit {
  doctors: any[] = [];
  filtered: any[] = [];
  searchTerm = '';
  filterMode = '';
  loading = true;
 
  constructor(private http: HttpClient, public auth: AuthService) {}
 
  ngOnInit(): void { this.load(); }
 
  load(): void {
    this.loading = true;
    this.http.get(`${API}/admin/doctors`).subscribe({
      next: (data: any) => {
        this.doctors = data;
        this.applyFilter();
        this.loading = false;
      }
    });
  }
 
  applyFilter(): void {
    this.filtered = this.doctors.filter(d => {
      const matchSearch = !this.searchTerm ||
        d.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        d.specialization.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchMode = !this.filterMode || d.mode === this.filterMode;
      return matchSearch && matchMode;
    });
  }
 
  toggle(id: number): void {
    this.http.put(`${API}/admin/doctors/${id}/toggle`, {}).subscribe({
      next: (res: any) => {
        Swal.fire('Updated', res.message, 'success');
        this.load();
      }
    });
  }
}
