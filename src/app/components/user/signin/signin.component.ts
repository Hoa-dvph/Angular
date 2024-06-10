import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']  // Corrected styleUrls typo
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  loginError: string = '';

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

  get f(): { [key: string]: AbstractControl } {
    return this.signinForm.controls;
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      return;
    }

    this.authService.login(this.signinForm.value).subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        } else {
          this.loginError = 'Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.';
        }
      },
      error => {
        console.error('Đăng nhập thất bại:', error);
        this.loginError = 'Đăng nhập thất bại. Vui lòng thử lại sau.';
      }
    );
  }
}
