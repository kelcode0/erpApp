import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string = '';
  userSubs!: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe(({ user }) => {
      this.userName = user?.name || '';
    });
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logOut() {
    this.auth.logout().then((response) => {
      console.log(response);

      this.router.navigate(['/login']);
    });
  }
}
