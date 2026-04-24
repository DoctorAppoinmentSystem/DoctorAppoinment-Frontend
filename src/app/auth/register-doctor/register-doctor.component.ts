// src/app/auth/register-doctor/register-doctor.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

const API = 'http://localhost:5199/api';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {
  form: FormGroup;
  loading = false;
  specializations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      name:             ['', Validators.required],
      email:            ['', [Validators.required, Validators.email]],
      password:         ['', [Validators.required, Validators.minLength(6)]],
      phone:            [''],
      address:          [''],
      specializationId: [null, Validators.required],
      degree:           [''],
      experience:       [0],
      mode:             ['', Validators.required]  // Online, Offline, or Both
    });
  }

  ngOnInit(): void {
    this.http.get(`${API}/specialization`)
      .subscribe((data: any) => this.specializations = data);
  }

  // Add to register-doctor.component.ts (inside the class)
 
  getGroups(): string[] {
    const cats = [...new Set(this.specializations.map((s: any) => s.category))];
    return cats.sort();
  }
 
  getByCategory(cat: string): any[] {
    return this.specializations.filter((s: any) => s.category === cat);
  }


  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.registerDoctor(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Doctor Registration Successful!',
          text: 'Please verify your email before logging in.'
        }).then(() => this.router.navigate(['/login']));
      },
      error: (err) => {
        this.loading = false;
        Swal.fire('Error', err.error?.message || 'Registration failed.', 'error');
      }
    });
  }
}
