import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',  
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }
}
