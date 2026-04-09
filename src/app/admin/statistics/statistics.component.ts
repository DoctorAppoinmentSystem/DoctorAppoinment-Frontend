// src/app/admin/statistics/statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  stats: any = {};
  dailySummary: any = null;
  summaryDate = new Date().toISOString().split('T')[0];
  loading = true;
  summaryLoading = false;
 
  constructor(private http: HttpClient, public auth: AuthService) {}
 
  ngOnInit(): void {
    this.http.get(`${API}/admin/statistics`).subscribe({
      next: (data: any) => { this.stats = data; this.loading = false; }
    });
  }
 
  loadDailySummary(): void {
    this.summaryLoading = true;
    this.http.get(`${API}/admin/daily-summary?date=${this.summaryDate}`).subscribe({
      next: (data: any) => { this.dailySummary = data; this.summaryLoading = false; },
      error: () => this.summaryLoading = false
    });
  }
}
