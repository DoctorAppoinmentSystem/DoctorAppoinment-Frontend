// src/app/auth/register-patient/register-patient.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.scss']
})
export class RegisterPatientComponent {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone:    [''],
      address:  ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.registerPatient(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Please check your email to verify your account.',
          confirmButtonText: 'Go to Login'
        }).then(() => this.router.navigate(['/login']));
      },
      error: (err) => {
        this.loading = false;
        Swal.fire('Registration Failed', err.error?.message || 'Error occurred.', 'error');
      }
    });
  }
}
