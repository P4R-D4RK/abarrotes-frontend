import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  user: User = {
    role: 'all',
    user: null,
  };

  async ngOnInit() {
    const res = await this.authService.logged();
    if (res) {
      this.user = res;
      console.log(this.user);
    }
  }
}
