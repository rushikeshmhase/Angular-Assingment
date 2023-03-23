import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Doctor_Appointment_System';

  constructor(private authservice:AuthService){}

  isLoggedIn() {
    return this.authservice.isLoggedIn();
  }
  logout() {
    this.authservice.logout();
  }
}
