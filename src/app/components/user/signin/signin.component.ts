import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      return;
    }
    this.authService.login(this.signinForm.value).subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          alert('Đăng nhập thành công');
          this.router.navigate(['/']);
        } else {
          alert('Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.');
        }
      },
      error => {
        console.error('Đăng nhập thất bại:', error);
      }
    );
  }
}