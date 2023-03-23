import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{

  email: string = '';
  password: string = '';

  registerform!: FormGroup;
  constructor(private builder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.registerform = this.builder.group({
      id: [''],
      name: this.builder.control(''),
      email: this.builder.control(''),
      password: this.builder.control('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
        // Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$')
      ]),
      gender: this.builder.control(''),
      mobile: this.builder.control(''),


    });
  }

  register() {

    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.register(this.email, this.password);

    this.email = '';
    this.password = '';

  }

}
