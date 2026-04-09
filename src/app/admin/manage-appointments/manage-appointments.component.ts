// src/app/admin/manage-appointments/manage-appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.scss']
})
export class ManageAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filtered: any[] = [];
  searchTerm = '';
  filterStatus = '';
  filterMode = '';
  loading = true;
 
  constructor(private http: HttpClient, public auth: AuthService) {}
 
  ngOnInit(): void { this.load(); }
 
  load(): void {
    this.loading = true;
    this.http.get(`${API}/appointment/all`).subscribe({
      next: (data: any) => {
        this.appointments = data;
        this.applyFilter();
        this.loading = false;
      }
    });
  }
 
  applyFilter(): void {
    this.filtered = this.appointments.filter(a => {
      const s = !this.searchTerm ||
        a.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        a.doctorName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const st = !this.filterStatus || a.status === this.filterStatus;
      const m  = !this.filterMode   || a.mode   === this.filterMode;
      return s && st && m;
    });
  }
 
  updateStatus(id: number, status: string): void {
    Swal.fire({ title: `Set to ${status}?`, icon:'question',
      showCancelButton:true, confirmButtonText:'Yes' }).then(r => {
      if (r.isConfirmed) {
        this.http.put(`${API}/appointment/${id}/status`, { status })
          .subscribe({ next: () => { Swal.fire('Done!','','success'); this.load(); } });
      }
    });
  }
 
  getStatusClass(s: string): string {
    const m: any = { Pending:'badge-warning', Confirmed:'badge-success',
      Cancelled:'badge-danger', Completed:'badge-info', NoShow:'badge-secondary' };
    return m[s] || '';
  }
}
