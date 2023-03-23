
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email : string = '';
  password : string = '';
  radioButton : string = '';
  //customer : string = '';

  constructor(private builder: FormBuilder,private auth : AuthService) { }

  ngOnInit(): void {
  }
  loginform = this.builder.group({
    email: ['', [Validators.required,]],
    password: ['', [Validators.required,]],
    radioButton: ['',[Validators.required,]]
  });
  login() {
   alert("radio="+this.radioButton);

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if(this.radioButton == '') {
      alert('Please select any radioButton');
      return;
    }

    this.auth.login(this.email,this.password,this.radioButton);
    
    this.email = '';
    this.password = '';

  }
  signInWithGoogle() {
    this.auth.googleSignIn();
  }
 
 
}
