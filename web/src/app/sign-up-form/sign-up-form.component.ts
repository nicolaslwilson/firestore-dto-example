import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export class SignUpFormValues {
  email: string;
  name: string;
  password: string;
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  form = this.fb.group({
    email: ['', Validators.email],
    name: ['', Validators.required],
    password: ['', Validators.minLength(8)],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  get formValue() {
    return this.form.value as SignUpFormValues;
  }

  ngOnInit() {
  }

  async submit() {
    try {
      const form = this.formValue;
      await this.authService.signUp(form);
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }

  }



}
