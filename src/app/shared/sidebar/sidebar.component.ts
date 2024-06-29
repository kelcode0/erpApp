import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logOut() {
    this.auth.logout().then((response) => {
      console.log(response);

      this.router.navigate(['/login']);
    });
  }
}
