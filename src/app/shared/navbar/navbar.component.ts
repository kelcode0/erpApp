import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userName: string = '';
  userSubs!: Subscription;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe(({ user }) => {
      this.userName = user?.name || '';
    });
  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
