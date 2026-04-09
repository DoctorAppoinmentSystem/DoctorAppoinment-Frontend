// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Swal.fire('Validation Error', 'Please fill all required fields.', 'warning');
      return;
    }

    this.loading = true;
    this.authService.loginPatient(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        Swal.fire({
          icon: 'success', title: 'Welcome!',
          text: `Logged in as ${res.role}`,
          timer: 1500, showConfirmButton: false
        }).then(() => {
          if (res.role === 'Patient') this.router.navigate(['/patient/dashboard']);
          else if (res.role === 'Doctor') this.router.navigate(['/doctor/dashboard']);
          else this.router.navigate(['/admin/dashboard']);
        });
      },
      error: (err) => {
        this.loading = false;
        Swal.fire('Login Failed', err.error?.message || 'Invalid credentials', 'error');
      }
    });
  }
}
