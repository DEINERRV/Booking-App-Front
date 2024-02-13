import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  private _authService: AuthService = inject(AuthService);

  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null,[Validators.min(10000000),Validators.max(99999999)]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })

  signup(){
    const user = this.getUserFromForm();
    this._authService.signup(user).subscribe({
      next: (data) => {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getUserFromForm(){
    return {
      name: this.signUpForm.getRawValue().firstName!,
      lastName: this.signUpForm.getRawValue().lastName!,
      email: this.signUpForm.getRawValue().email!,
      phone: this.signUpForm.getRawValue().phone,
      password: this.signUpForm.getRawValue().password!
    }
  }
}
